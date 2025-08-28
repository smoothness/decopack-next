import { collectionFragment } from "@/lib/shopify/fragments/collection";
import { productFragment } from "@/lib/shopify/fragments/product";

export const getCollectionsQuery = `
  query getCollections {
    collections(first: 100 sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`

export const getCollectionProductsQuery = `
  query getCollectionsProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`
