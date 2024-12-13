import { handle } from './handle'

(() => {
  const interval = process.env.RUN_SCRIPT_INTERVAL as string

  setInterval(async () => {
    await handle()
    console.log('run')
  }, +interval)
})()
