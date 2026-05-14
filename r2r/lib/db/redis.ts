import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redisClient: Redis | undefined;
}

function getClient(): Redis {
  if (!globalThis._redisClient) {
    globalThis._redisClient = new Redis(process.env.REDIS_URL!, {
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
    const raw = await getClient().get(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // treat as cache miss when Redis is unavailable
  }
  return null;
}

export async function setCached(
  key: string,
  value: unknown,
  ttlSeconds = 300
): Promise<void> {
  try {
    await getClient().set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    // ignore — Redis caching is best-effort
  }
}

export async function deleteCached(...keys: string[]): Promise<void> {
  if (!keys.length) return;
  try {
    await getClient().del(...keys);
  } catch {
    // ignore
  }
}
