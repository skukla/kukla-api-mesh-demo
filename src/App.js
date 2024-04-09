import "./styles.css";
import "react-tooltip/dist/react-tooltip.css";
import React from "react";
import { Tooltip } from "react-tooltip";
import { SEARCH_TERM, query } from "./query.js";
import CodeSidebar from "./codeSidebar";

const API_MESH_URL =
  "https://graph.adobe.io/api/96f6da72-39f8-4542-ae20-ef6ee27a0b54/graphql?api_key=20fa505203b045ebaac2909cd6e2cefe";

const SOURCE_1_NAME = "Source: Adobe Commerce";
const SOURCE_2_NAME = "Source: ERP";
const SOURCE_3_NAME = "Source: OMS";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: "",
      products: [],
      salePrice: 0.5,
      search_term: SEARCH_TERM,
    };
  }

  componentDidMount() {
    let options = {
      method: "post",
      body: JSON.stringify(query),
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(API_MESH_URL, options)
      .then(response => response.json())
      .then(res => {
        console.log(res);

        this.setState({
          apiMeshRes: res.data,
          products: res.data.products.items,
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <img className="nav" src="nav.png" />
          <h2>Your search results</h2>

          <div className="results">
            <div>
              <ul>
                {this.state.products.map((item, idx) => (
                  <>
                    <li id={idx} key={item.sku}>
                      <img id={item.image.url} src={item.image.url} />
                      <p className="item-name auto-width" id={item.name}>
                        {item.name}
                      </p>

                      {this.state.salePrice ? (
                        <div className="price-container">
                          <p className="price strike" id={idx + item.price_range.minimum_price.regular_price.value}>
                            {USDollar.format(item.price_range.minimum_price.regular_price.value)}
                          </p>
                          <p className="price sale" id={idx + this.state.salePrice}>
                            {USDollar.format(item.price_range.minimum_price.regular_price.value * this.state.salePrice)}
                          </p>
                        </div>
                      ) : (
                        <p id="price">${item.price_range.minimum_price.regular_price.value}</p>
                      )}

                      <button>ADD TO CART</button>
                      <span>&#9825;</span>

                      {item.demoDetails ? (
                        <div>
                          <p className="auto-width" id={item.sku}>
                            Items remaining: {item.demoDetails.quantity}
                          </p>
                          <p className="auto-width" id={item.sku + idx}>
                            Location: {item.demoDetails.location}
                          </p>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <Tooltip anchorId={item.image.url} place="bottom" content={SOURCE_1_NAME} />

                      <Tooltip anchorId={item.name} place="bottom" content={SOURCE_1_NAME} />

                      <Tooltip
                        anchorId={idx + item.price_range.minimum_price.regular_price.value}
                        place="bottom"
                        content={SOURCE_1_NAME}
                      />

                      <Tooltip anchorId={idx + this.state.salePrice} place="bottom" content={SOURCE_2_NAME} />

                      <Tooltip anchorId={"price"} place="bottom" content={SOURCE_1_NAME} />

                      <Tooltip anchorId={item.sku} place="bottom" content={SOURCE_2_NAME} />

                      <Tooltip anchorId={item.sku + idx} place="bottom" content={SOURCE_3_NAME} />
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div>
              <CodeSidebar meshResponse={this.state.apiMeshRes} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default APIMeshExample;
