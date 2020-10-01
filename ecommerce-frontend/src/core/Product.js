import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProductById, listRelatedProducts } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    getProductById(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related products
        listRelatedProducts(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    //to load the productId from the route when this
    //component mounts
    //we get props from react-router-dom
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    //whenever there is change in props we want to useEffect 
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProducts.map((product, i) => (
            <div className="mb-3">
              <Card key={i} product={product}/>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
