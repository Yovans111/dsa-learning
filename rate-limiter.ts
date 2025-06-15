type RateLimiterMap = {
    count: number;
    time: number;
}

class RateLimiter {

    private hashMap: Record<string, RateLimiterMap> = {};
    private limitCount: number = 0;
    private rateLimitMs: number = 0;

    constructor(limitCount: number, rateLimitMs: number) {
        this.limitCount = limitCount;
        this.rateLimitMs = rateLimitMs
    }

    addRequest(id: string) {
        const now = Date.now();
        const entry = this.hashMap[id];

        if (!entry || now - entry.time > this.rateLimitMs) {
            this.hashMap[id] = { count: 1, time: Date.now() }
            return true
        }
        if (entry.count >= this.limitCount) {
            throw Error('Limit Exceed')
        }
        this.hashMap[id].count++
        return true
    }
}

const limiter = new RateLimiter(3, 10000);
console.log(limiter.addRequest('user1')); // true
console.log(limiter.addRequest('user1')); // true
console.log(limiter.addRequest('user1')); // true

console.log(limiter.addRequest('user1')); // Limit Exceed