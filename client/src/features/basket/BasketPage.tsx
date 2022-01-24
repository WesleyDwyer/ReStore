import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/lab/node_modules/@mui/system";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    // const {basket,setBasket, removeItem} = useStoreContext();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useDispatch();


    if(!basket)
        return <Typography variant='h3'>Your basket is empty</Typography>



    return (
        <>
                {/* //<h1>Buyer Id = {basket.buyerId}</h1> */}
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map(item => (
                    <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        {/* {item.name} */}
                        <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight:20}}/>
                                <span>{item.name}</span>
                        </Box>
                        </TableCell>
                        <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>

                        <TableCell align='center'>
                            <LoadingButton loading={status === 'pendingRemoveItem' + item.productId} 
                                        color='error' 
                                        onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1}))}>
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton color='secondary' 
                                        loading={status === 'pendingAddItem' + item.productId} 
                                        onClick={() => dispatch(addBasketItemAsync({productId:item.productId}))}>
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">{((item.price / 100)* item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton color='error' 
                                        loading={status === 'pendingDeleteItem' + item.productId} 
                                        onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity}))}> 
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}