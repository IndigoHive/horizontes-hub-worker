import { UUID } from '../types/uuid'

export const cogfyCollectionsNames = [
  'General',
  'Empresas',
  'Startups',
  'Desafios'
] as const

export type CogfyCollectionsNames = typeof cogfyCollectionsNames[number]

export const cogfyCollectionNameCollectionId: Record<CogfyCollectionsNames, UUID> = {
  General: 'b6801a5e-352d-4f3f-8518-b31f7640f886',
  Empresas: '8dabb322-9a5b-49c1-8837-cc3b1ece9ffc',
  Startups: '4eaa31a0-3f58-43ba-b41b-e2a690c77654',
  Desafios: '92191066-b7b1-43f2-98de-739b8e16f3c6'
}

export const cogfyCollectionNameFieldUrlId: Record<CogfyCollectionsNames, UUID> = {
  Desafios: 'cba465b8-e67b-4198-a0dc-2f632c58242a',
  Empresas: 'd17e6276-c2f5-4885-8672-03528f4565b2',
  General: '5538ebc2-1028-4ddd-b5a5-88c6da213069',
  Startups: 'b2b7dfd5-6479-49ac-a73f-179ce6ccd85d'
}

export const cogfyCollectionNameFieldScheduleId: Record<CogfyCollectionsNames, UUID> = {
  Desafios: '33688de2-ce87-45c0-b29a-b22af0575379',
  Empresas: '25ff4f22-33cc-4792-bdea-92064c793d6b',
  General: '6fcdfc68-ac18-4b8b-bc49-8cfb465852a3',
  Startups: '6221ca35-7cf3-4652-b184-1e461447d783'
}
