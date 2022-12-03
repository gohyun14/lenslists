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
