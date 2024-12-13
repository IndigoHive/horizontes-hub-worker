import { Cogfy, TextRecordProperty } from 'cogfy'
import { fetchAndParseSitemap, mapUrlsToCogfyCollections } from './lib/utils'
import { cogfyCollectionNameCollectionId, cogfyCollectionNameFieldId } from './lib/constants/cogfy-collections'

export async function handle() {
  const urls = await fetchAndParseSitemap('https://horizontes-hub.framer.website/sitemap.xml')
  const collectionUrls = mapUrlsToCogfyCollections(urls)

  const cogfy = new Cogfy({
    apiKey: process.env.COGFY_API_KEY
  })

  const collections = Object.entries(cogfyCollectionNameCollectionId)

  for (const collection of collections) {
    const records = await cogfy.records.query(collection[1], {
      fieldIds: [
        cogfyCollectionNameFieldId[collection[0] as keyof typeof cogfyCollectionNameFieldId]
      ]
    })

    const recordValues = records.data.map(record => record.properties[cogfyCollectionNameFieldId[collection[0] as keyof typeof cogfyCollectionNameFieldId]] as TextRecordProperty)

    const valuesToRemove = recordValues.filter(value => value.text.value && !collectionUrls[collection[0] as keyof typeof collectionUrls].includes(value.text.value))
    const valuesToAdd = collectionUrls[collection[0] as keyof typeof collectionUrls].filter(value => !recordValues.map(recordValue => recordValue.text.value).includes(value))

    for (const value of valuesToRemove) {
      const record = records.data.find(record => (record.properties[cogfyCollectionNameFieldId[collection[0] as keyof typeof cogfyCollectionNameFieldId]] as TextRecordProperty).text.value === value.text.value)

      if (record) {
        await cogfy.records.delete(collection[1], record.id)
      }
    }

    for (const value of valuesToAdd) {
      await cogfy.records.create(collection[1], {
        properties: {
          [cogfyCollectionNameFieldId[collection[0] as keyof typeof cogfyCollectionNameFieldId]]: {
            type: 'text',
            text: {
              value
            }
          }
        }
      })
    }
  }
}
