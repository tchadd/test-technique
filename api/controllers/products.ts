import { Request } from "express";
import { ObjectId } from "mongodb";
import { FullResponse } from "../types/full_response";

function handleErreor(err: any, res: FullResponse){
    console.error('Failed to fetch products', err);
    res.status(500).send({error: "Internal error"});
}

export async function showAllProducts(req: Request, res: FullResponse) {
    try {
        res.json(await res.locals.db.collection('products').find().toArray());
    } catch (err) { handleErreor(err, res) }
}

export async function showProduct(req: Request, res: FullResponse) {
    try{
        const productId = parseInt(req.params.id, 10);
        const product = await res.locals.db.collection('products').findOne({ _id: productId as any as ObjectId });
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
    } catch (err) { handleErreor(err, res) }
}

export async function addProduct(req: Request, res: FullResponse) {
    try {
        const {name,price,type,rating,warranty_years,available } = req.body;
        const lastIndex = (await res.locals.db.collection('products').findOne({}, {sort: {_id: -1}}))?._id as number | undefined || 0 ;
        // simple value conversions, usage of YUP would be recommended
        const newProduct = await res.locals.db.collection('products').insertOne({
            _id: lastIndex+1 as any as ObjectId,
            name:`${name}`, 
            price:+price,
            type:`${type}`,
            rating:+rating,
            warranty_years:+warranty_years,
            available:!!available 
        });
        res.status(201).json(newProduct);
        res.locals.io.emit("products:needs_update")
    } catch (err) { handleErreor(err, res) }
};
    
export async function updateProduct(req: Request, res: FullResponse) {
    try {
        const { name, price,type,rating,warranty_years,available } = req.body;
        // simple value conversions, usage of YUP would be recommended
        let product = await res.locals.db.collection('products').updateOne({_id: +req.params.id as any as ObjectId},{ $set:{
            name:`${name}`, 
            price:+price,
            type:`${type}`,
            rating:+rating,
            warranty_years:+warranty_years,
            available:!!available 
        }});
        if (!product) return res.status(404).send('Product not found');
        res.json(product);
        res.locals.io.emit("products:needs_update")
    } catch (err) { handleErreor(err, res) }
};

export async function deleteProduct(req: Request, res: FullResponse) {
    try {
        const productId = parseInt(req.params.id, 10);
        const deletedProduct = await res.locals.db.collection('products').deleteOne({_id: productId as any as ObjectId});
        if (!deletedProduct) return res.status(404).send('Product not found');
        res.json({ message: 'Product deleted successfully', deletedProduct });
        res.locals.io.emit("products:needs_update")
    } catch (err) { handleErreor(err, res) }
};

