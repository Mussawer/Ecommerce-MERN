import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked]

    const handleToggle = category => () => {
        //trying to find checked category
        //this indexof() will return first index at which given element
        //can be found in the array if not found then return -1 
        const currentCategoryId = checked.indexOf(category)
        //this will give all categories in the state
        const newCheckedCategoryId = [...checked]
        //if currently checked was not already checked state > push
        //else pull/ take of
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(category)
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

  return categories.map((category, i) => (
    <li key={i} className="list-unstyled">
      <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input" />
  <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;