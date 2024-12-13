import pino from 'pino'

const level = process.env.LOG_LEVEL ?? 'info'

export const logger = pino({
  level,
  serializers: {
    buffer: obj => obj instanceof Buffer
      ? { type: 'Buffer', length: obj.length }
      : obj
  }
})
