export type Weight = {
  imperial: string
  metric: string
}

export type Image = {
  id: string
  width: number
  height: number
  url: string
}

export type BreedModel = {
  weight: Weight
  id: string
  name: string
  cfaUrl: string
  vetstreetUrl: string
  vcahospitalsUrl: string
  temperament: string
  origin: string
  countryCodes: string
  countryCode: string
  description: string
  lifeSpan: string
  indoor: number
  altNames: string
  adaptability: number
  affectionLevel: number
  childFriendly: number
  dogFriendly: number
  energyLevel: number
  grooming: number
  healthIssues: number
  intelligence: number
  sheddingLevel: number
  socialNeeds: number
  strangerFriendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressedTail: number
  shortLegs: number
  wikipediaUrl: string
  hypoallergenic: number
  referenceImageId: string
  image: Image
}
