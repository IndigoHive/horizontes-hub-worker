import { CogfyCollectionsNames } from '../constants/cogfy-collections'

export function mapUrlsToCogfyCollections(urls: string[]): Record<CogfyCollectionsNames, string[]> {
  const baseUrl = 'https://horizontes-hub.framer.website'

  const collections: Record<CogfyCollectionsNames, string[]> = {
    General: [],
    Empresas: [],
    Startups: [],
    Desafios: []
  }

  for (const url of urls) {
    const path = url.replace(baseUrl, '')

    if (path.startsWith('/para-empresas/')) {
      collections.Empresas = [...collections.Empresas, url]
    } else if (path.startsWith('/para-startups/')) {
      collections.Startups = [...collections.Startups, url]
    } else if (path.startsWith('/publicacoes')) {
      collections.Desafios = [...collections.Desafios, url]
    } else {
      collections.General = [...collections.General, url]
    }
  }

  return collections
}
