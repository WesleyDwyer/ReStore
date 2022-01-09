import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

export default function Catalog(){
      //state
  const[products,setProducts] = useState<Product[]>([]);

  const [loading,setLoading] = useState(true);

  useEffect(() =>
  {
    // fetch('http://localhost:5000/api/products')
    //   .then(res => res.json())
    //   .then(data => setProducts(data))
    agent.Catalog.list()
                 .then(product => setProducts(product))
                 .catch(error => console.log(error))
                 .finally(() => setLoading(false))
  },[]) //only called once with the dependencies

  if(loading) return <LoadingComponent message='Loading Products...'/>
    return (
       <>
            <ProductList products={products}/>
       </>
    )
}