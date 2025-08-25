import { seoFragment } from "@/libs/shopify/fragments/seo";

export const collectionFragment = `
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`
