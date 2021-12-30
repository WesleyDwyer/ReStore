import { useState, useEffect } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

export default function Catalog(){
      //state
  const[products,setProducts] = useState<Product[]>([]);

  useEffect(() =>
  {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  },[]) //only called once with the dependencies

//   function addProduct(){
//     //spread operator
//     // setProducts([...products,{name:'product3',price: 300.00}]);
//     setProducts(prevState => [...prevState,
//       {
//         id:prevState.length + 101,
//         name:'product' + (prevState.length +1 ),
//         price: (prevState.length * 100) + 100.00,
//         brand: 'some brand',
//         description: 'some description',
//         pictureUrl: 'http://picsum.photos/200'
//       }]);
//   }
    return (
       <>
            <ProductList products={products}/>
            {/* <Button variant='contained' onClick={addProduct}>Add Product</Button> */}
       </>
    )
}