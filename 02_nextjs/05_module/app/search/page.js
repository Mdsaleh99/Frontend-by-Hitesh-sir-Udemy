"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  /*
    read and interact with query params in the current url
    1. Dynamic filtering
    2. Deep Linking
    3. Pagination & Sorting
    4. tags=js&tags=react (Multi value params)
  
  */

  const query = searchParams.get("q");
  const category = searchParams.get("category"); // 'electronics'
  const page = searchParams.get("page");

  const allparams = Array.from(searchParams.entries());

  console.log(allparams);

  return (
    <div>
      <h1>Search result for:{query}</h1>

      <p>category: {category}</p>
      <p>Page: {page}</p>
    </div>
  );
};

export default SearchPage;
