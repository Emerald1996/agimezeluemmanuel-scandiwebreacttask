import { gql } from "@apollo/client"
import { graphql } from '@apollo/client/react/hoc'


export const GET_DATA = gql`
  {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        description
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }
      }
    }
  }
`;



const getProductQuery = gql`

      query GET_PRODUCT($productId: String!){
        product(id: id) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency{
              label
              symbol
            }
            amount
          }
          brand
        }
      }
      
`
export default graphql(getProductQuery,{
  options: (props) => {
    return{
      variables: {
        id: props.productId
      }
    }
  }
})(getProductQuery)