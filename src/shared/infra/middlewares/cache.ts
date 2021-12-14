/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';

import RedisCache from '@shared/cache/RedisCache';

export function invalidateCache(...cacheNames: Array<string>) {
  return (_request: Request, _response: Response, next: NextFunction) => {
    cacheNames.forEach((cacheName) => {
      RedisCache.invalidate(cacheName);
    });

    next();
  };
}

export function recoverCache(cacheName: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const value = await RedisCache.recover(cacheName);
    if (value) {
      return response.json(value);
    }

    next();
    return null;
  };
}
