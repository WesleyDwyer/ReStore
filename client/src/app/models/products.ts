//benefit of typescript is that it is type safe
//use json2ts.com to convert json to ts interface
export interface Product{
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string; //make property optional
    brand: string;
    quantityInStock?: number; //make property optional
}

export interface ProductParams{
    orderBy: string;
    searchTerm?: string;
    types: string[];
    pageNumber: number;
    pageSize: number;
    brands: string[];
}