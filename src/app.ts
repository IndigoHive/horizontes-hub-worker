import { handle } from './handle'
import { logger } from './lib/common'

(() => {
  const interval = process.env.RUN_SCRIPT_INTERVAL_MS as string

  console.log(interval)

  setInterval(async () => {
    await handle()
      .then(() => logger.info('Script ran successfully'))
      .catch(error => logger.error(error))
      .finally(() => logger.info(`Next run in ${interval}ms`))
  }, +interval)
})()
