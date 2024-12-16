import { handle } from './handle'
import { logger } from './lib/common'

(() => {
  const interval = process.env.RUN_SCRIPT_INTERVAL_MS || 5000

  logger.info(`Running script every ${interval}ms`)

  setInterval(async () => {
    await handle()
      .then(() => logger.info('Script ran successfully'))
      .catch(error => logger.error(error))
      .finally(() => logger.info(`Next run in ${interval}ms`))
  }, +interval)
})()
