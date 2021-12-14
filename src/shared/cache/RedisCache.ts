import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@shared/config/cache';

class RedisCache {
  private client: RedisClient;
  private connected = false;

  constructor() {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  public async save(
    key: string,
    value: any,
    timeInSeconds = 3600
  ): Promise<void> {
    await this.client.setex(key, timeInSeconds, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key).catch((err) => {
      console.log(err);
    });

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisCache();
