import { Cogfy, TextRecordProperty } from 'cogfy'
import { fetchAndParseSitemap, mapUrlsToCogfyCollections } from './lib/utils'
import { cogfyCollectionNameCollectionId, cogfyCollectionNameFieldId } from './lib/constants/cogfy-collections'

(async () => {
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

    const recordValues = records.data.map(record => {
      const item = record.properties[cogfyCollectionNameFieldId[collection[0] as keyof typeof cogfyCollectionNameFieldId]] as TextRecordProperty

      return item.text.value
    })

    const valuesToRemove = recordValues.filter(value => value && !collectionUrls[collection[0] as keyof typeof collectionUrls].includes(value))
    const valuesToAdd = collectionUrls[collection[0] as keyof typeof collectionUrls].filter(url => !recordValues.includes(url))

    console.log('To remove ' + collection[0], valuesToRemove)
    console.log('To add  ' + collection[0], valuesToAdd)
  }
})()
