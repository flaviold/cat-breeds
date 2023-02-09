import { createClient, RedisClientType } from 'redis'
import env from '../../config/env'

class RedisHelper {
  private static readonly client: RedisClientType = createClient({
    url: env.redisUrl
  })

  private async connect (): Promise<void> {
    if (RedisHelper.client.isOpen) {
      return
    }

    await RedisHelper.client.connect()
  }

  async get <T>(key: string): Promise<T> {
    if (!RedisHelper.client.isOpen) {
      await this.connect()
    }

    return JSON.parse(await RedisHelper.client.get(key)) as T
  }

  async set (key: string, value: any): Promise<void> {
    if (!RedisHelper.client.isOpen) {
      await this.connect()
    }

    await RedisHelper.client.set(key, JSON.stringify(value), {
      EX: env.redisCacheExpiration as number
    })
  }
}

export const redisHelper = new RedisHelper()
