import React, { useState, useEffect } from "react";
import { getCategories, getProductsByQueryParameters } from "./apiCore";
import Card from "./Card";

const Search = () => {
  //data will be an object
  //with properties like categories to show drop down with all catgories
  //so that categories can be selected from drop down to search
  //we need single category as well because when user picks single cataegory we need
  //to store that
  //we also need search to get whatever value in search
  //we need results to store all the filtered results
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadcategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadcategories();
  }, []);

  //searchData this method will make requests and fetch data
  const searchData = () => {
    if (search) {
      //it takes params so search: search will be whatever in the state
      //if nothing then undefined
      getProductsByQueryParameters({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    //fetch the product based on whatever the user type in
    //weneed to take the search and category from the state and send it to backend
    //to fetch the product

    searchData();
  };

  const handleChange = (name) => (event) => {
    //we use setData to set the state
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
      if(searched && results.length > 0){
          return `Found ${results.length} products`
      }
      if(searched && results.length < 1){
        return `No products found`
    }
  }

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div classname="row">
      <div classname="container mb-3">{searchForm()}</div>
      <div classname="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
