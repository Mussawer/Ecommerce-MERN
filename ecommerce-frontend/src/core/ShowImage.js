import react from "react";
import { API } from "../config";

//this function will takes props
//let destructure the arguments
//item could be product so we can grab the product id
//and grab the url so that we can makae the request to API/product
const ShowImage = ({ item, url }) => (
  <div classname="product-image">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
  </div>
);

export default ShowImage;