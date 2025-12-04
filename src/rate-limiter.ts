
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function rateLimit(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true; 
  }

  const { count, timestamp } = entry;

  
  if (now - timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

 
  if (count >= limit) {
    return false; 
  }

  rateLimitMap.set(ip, { count: count + 1, timestamp });
  return true;
}
