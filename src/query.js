const SEARCH_TERM = "scarf";
const NUMBER_OF_RESULTS = 6;

const query = {
  query: `{
    products(search: "${SEARCH_TERM}") {
      items {
        name
        sku
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        image {
          url
        }
        ... on SimpleProduct {
          demoDetails {
            
            sku
            location
            quantity
          }
        }
      }
    }
  }`,
};
export { SEARCH_TERM, query };
