import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog(){
      //state
    const products = useAppSelector(productSelectors.selectAll);
    const {productLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

  useEffect(() =>
  {
    if(!productLoaded) dispatch(fetchProductsAsync());
    
  },[productLoaded, dispatch]) //only called once with the dependencies

  if(status.includes('pending')) return <LoadingComponent message='Loading Products...'/>
    
  return (
       <>
            <ProductList products={products}/>
       </>
    )
}