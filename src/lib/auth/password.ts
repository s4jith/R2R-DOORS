export function verifyPassword(plain: string, expected: string): Promise<boolean> {
  return Promise.resolve(plain === expected);
}
