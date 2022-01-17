import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import {history} from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500)); // Promise is use for Async in javascript

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true; //needed in conjunction with the server side course
//browser receive the cookie and set it as well

const responseBody = (response: AxiosResponse) => response.data;

function responseBodyFn(response: AxiosResponse)
{
    return response.data;
}

axios.interceptors.response.use(async response => {
    await sleep();
    return response
},(error: AxiosError) =>{
    // console.log('caught by interceptor.');
    const {data,status} = error.response!;// ! turns off type safety

    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            // toast.error(data.title);
            history.push({
                pathname: '/server-error',
                state: {error: data}

            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url).then(responseBody),
    put: (url: string, body: {}) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const TestErrors ={
    get404Error: () => requests.get('buggy/not-found'),
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Catalog = {
    list: () => requests.get('products'),
    details:(id: number) => requests.get(`products/${id}`)
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number,quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),//{} pass an empty object with request
    removeItem: (productId: number,quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}
const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;