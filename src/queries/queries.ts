import { gql } from "@apollo/client";

export const queryDefaultProfile = `
query defaultProfile($request: DefaultProfileRequest!) {
  defaultProfile(request: $request) {
    id
    handle
  }
}
`;

export const querySearch = gql`
  query SearchProfiles($request: SearchQueryRequest!) {
    search(request: $request) {
      ... on ProfileSearchResult {
        __typename
        items {
          id
          handle
          name
          picture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
`;

export const getPublications = gql`
  query Publications($id: ProfileId!) {
    publications(
      request: { profileId: $id, publicationTypes: [POST], limit: 30 }
    ) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
  }

  fragment ProfileFields on Profile {
    id
  }

  fragment PublicationStatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    totalUpvotes
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }
`;
