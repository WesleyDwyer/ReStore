import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'},
]

export default function Catalog(){
      //state
    const products = useAppSelector(productSelectors.selectAll);
    const {productLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
  useEffect(() =>
  {
    if(!productLoaded) dispatch(fetchProductsAsync());
  },[productLoaded, dispatch]) //only called once with the dependencies

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFiltersAsync());

  },[dispatch, filtersLoaded])

  if(!filtersLoaded) return <LoadingComponent message='Loading Products...'/>
    
  return (
       <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb:2}}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{mb: 2, p:2}}>
                    <RadioButtonGroup 
                          selectedValue={productParams.orderBy}
                          onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                          options={sortOptions}
                          />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons
                          items={brands}
                          checked={productParams.brands}
                          onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                        />
                </Paper>
                
                <Paper sx={{mb: 2, p: 2}}>
                      <CheckboxButtons
                                items={types}
                                checked={productParams.types}
                                onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                              />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb: 2}}>
              {metaData &&
                <AppPagination metaData={metaData} 
                   onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}/>
              }
            </Grid>
       </Grid>
    )
}