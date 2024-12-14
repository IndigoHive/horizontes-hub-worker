import { Cogfy, TextRecordProperty } from 'cogfy'
import { fetchAndParseSitemap, mapUrlsToCogfyCollections } from './lib/utils'
import { cogfyCollectionNameCollectionId, cogfyCollectionNameFieldScheduleId, cogfyCollectionNameFieldUrlId } from './lib/constants/cogfy-collections'
import { addMinutes } from 'date-fns'

export async function handle() {
  const urls = await fetchAndParseSitemap('https://horizontes-hub.framer.website/sitemap.xml')
  const collectionUrls = mapUrlsToCogfyCollections(urls)

  const cogfy = new Cogfy({
    apiKey: process.env.COGFY_API_KEY
  })

  const now = new Date()

  const collections = Object.entries(cogfyCollectionNameCollectionId)

  for (const collection of collections) {
    const records = await cogfy.records.query(collection[1], {
      fieldIds: [
        cogfyCollectionNameFieldUrlId[collection[0] as keyof typeof cogfyCollectionNameFieldUrlId]
      ]
    })

    const recordValues = records?.data.map(record => record.properties[cogfyCollectionNameFieldUrlId[collection[0] as keyof typeof cogfyCollectionNameFieldUrlId]] as TextRecordProperty) || []

    const valuesToRemove = recordValues.filter(value => value.text.value && !collectionUrls[collection[0] as keyof typeof collectionUrls].includes(value.text.value))
    const valuesToAdd = collectionUrls[collection[0] as keyof typeof collectionUrls].filter(value => !recordValues.map(recordValue => recordValue.text.value).includes(value))

    for (const value of valuesToRemove) {
      const record = records.data.find(record => (record.properties[cogfyCollectionNameFieldUrlId[collection[0] as keyof typeof cogfyCollectionNameFieldUrlId]] as TextRecordProperty).text.value === value.text.value)

      if (record) {
        await cogfy.records.delete(collection[1], record.id)
      }
    }

    for (const value of valuesToAdd) {
      await cogfy.records.create(collection[1], {
        properties: {
          [cogfyCollectionNameFieldUrlId[collection[0] as keyof typeof cogfyCollectionNameFieldUrlId]]: {
            type: 'text',
            text: {
              value
            }
          },
          [cogfyCollectionNameFieldScheduleId[collection[0] as keyof typeof cogfyCollectionNameFieldScheduleId]]: {
            type: 'schedule',
            schedule: {
              value: {
                interval: 1,
                unit: 'hours',
                startDate: now.toISOString(),
                nextDate: addMinutes(now.toISOString(), 5).toISOString()
              }
            }
          }
        }
      })
    }
  }
}
