import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    //updating our own state as well because based on this
    //we will show active input
    setValue(event.target.value);
  };

  return prices.map((price, i) => (
    <div key={i}>
      <input
        onChange={C}
        value={`$(price._id)`}
        name={price}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default RadioBox;
