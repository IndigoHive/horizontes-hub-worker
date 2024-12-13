export const publicationCategories = [
  'Artigo',
  'Desafio'
] as const;

export type PublicationCategory = typeof publicationCategories[number];
