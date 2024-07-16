exports.showAllProducts = async(req,res) => {
    try {
        db = req.db
        const products = await db.collection('products').find().toArray();
        res.json(products);
    }
    catch (err) {
        console.error('Failed to fetch products', err);
        res.status(500).send('Internal Server Error');
    }
}


exports.showProduct = async(req, res) => {
    try{
        const productId = parseInt(req.params.id, 10);
        const db = req.db
        
        console.log(productId);
        const product = await db.collection('products').findOne({ _id: productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    }
    catch (err) {
        console.error('Failed to fetch product', err);
        res.status(500).send('Internal Server Error');
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { name, price,type,rating,warranty_years,available } = req.body;
        db = req.db;
        const lastIndex = await db.collection('products').find().count();
        const newProduct = await db.collection('products').insertOne({ _id: lastIndex+1 ,name:name, price:price,type:type,rating:rating,warranty_years:warranty_years,available:available });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Failed to create product', err);
        res.status(500).send('Internal Server Error');
    }
};
    
exports.updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const { name, price,type,rating,warranty_years,available } = req.body;
        db = req.db;
        // check if the product exists
        let product = await db.collection('products').updateOne({_id: productId},{ $set: req.body});
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (err) {
        console.error('Failed to update product', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        console.log(productId);
        db = req.db
        const deletedProduct = await db.collection('products').deleteOne({_id: productId});
        console.log(deletedProduct);
        // .deleteOne({id_: productId})
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (err) {
        console.error('Failed to delete product', err);
        res.status(500).send('Internal Server Error');
    }
};

