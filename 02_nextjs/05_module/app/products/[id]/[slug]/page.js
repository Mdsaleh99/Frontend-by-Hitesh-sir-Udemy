"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const ProductIdSlugPage = () => {
  const params = useParams();
  /*
    1. only works in client com
    2. return all dynamic segements as strings
    3. nested dynamic routes are flattended into signle obj
    4. catch all routes [...slug] return an array
  */

  console.log(params);
  return (
    <div>
      <h1>Product Id: {params.id}</h1>
      <h2>Slug: {params.slug}</h2>
    </div>
  );
}

export default ProductIdSlugPage