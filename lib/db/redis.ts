import Redis, { type RedisOptions } from "ioredis";

declare global {
  var _redisClient: Redis | undefined;
  var _redisDisabled: boolean | undefined;
}

function parseRedisUrl(redisUrl: string): RedisOptions {
  if (redisUrl.startsWith("/")) {
    return { path: redisUrl };
  }

  const url = new URL(
    redisUrl.includes("://") ? redisUrl : `redis://${redisUrl}`
  );

  if (url.protocol !== "redis:" && url.protocol !== "rediss:") {
    throw new Error("REDIS_URL must use redis:// or rediss://");
  }

  const dbFromPath =
    url.pathname.length > 1 ? Number.parseInt(url.pathname.slice(1), 10) : NaN;
  const dbFromQuery = Number.parseInt(url.searchParams.get("db") ?? "", 10);
  const family = Number.parseInt(url.searchParams.get("family") ?? "", 10);

  return {
    host: url.hostname,
    port: url.port ? Number.parseInt(url.port, 10) : undefined,
    username: url.username ? decodeURIComponent(url.username) : undefined,
    password: url.password ? decodeURIComponent(url.password) : undefined,
    db: Number.isInteger(dbFromPath)
      ? dbFromPath
      : Number.isInteger(dbFromQuery)
        ? dbFromQuery
        : undefined,
    family: family === 4 || family === 6 ? family : undefined,
    tls: url.protocol === "rediss:" ? {} : undefined,
  };
}

function getClient(): Redis | null {
  if (globalThis._redisDisabled) return null;

  const redisUrl = process.env.REDIS_URL?.trim();
  if (!redisUrl) {
    globalThis._redisDisabled = true;
    return null;
  }

  if (!globalThis._redisClient) {
    const redisOptions = parseRedisUrl(redisUrl);
    globalThis._redisClient = new Redis({
      ...redisOptions,
      maxRetriesPerRequest: 1,
      enableReadyCheck: false,
      lazyConnect: true,
      connectTimeout: 3000,
    });
    globalThis._redisClient.on("error", (err: Error) => {
      console.warn("[Redis] connection error:", err.message);
    });
  }

  return globalThis._redisClient;
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const client = getClient();
    if (!client) return null;

    const raw = await client.get(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // Treat Redis failures as cache misses.
  }
  return null;
}

export async function setCached(
  key: string,
  value: unknown,
  ttlSeconds = 300
): Promise<void> {
  try {
    const client = getClient();
    if (!client) return;

    await client.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    // Redis caching is best-effort.
  }
}

export async function deleteCached(...keys: string[]): Promise<void> {
  if (!keys.length) return;
  try {
    const client = getClient();
    if (!client) return;

    await client.del(...keys);
  } catch {
    // Redis caching is best-effort.
  }
}
