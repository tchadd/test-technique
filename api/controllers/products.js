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

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description,type,rating,warranty_years,available } = req.body;
        db = req.db;
        const newProduct = await db.collection.create({ name, price, description,type,rating,warranty_years,available });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Failed to create product', err);
        res.status(500).send('Internal Server Error');
    }
};
    
exports.updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const { name, price, description,type,rating,warranty_years,available } = req.body;
        db = req.db;
        // check if the product exists
        let product = await db.collection.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        // update data if is updating
        if (name) product.name = name;
        if (type) product.type = type;
        if (price) product.price = price;
        if (description) product.description = description;
        if (rating) product.rating = rating;
        if (warranty_years) product.warranty_years = warranty_years;
        if (available) product.available = available;

        // save product to db
        await product.save();
        res.json(product);
    } catch (err) {
        console.error('Failed to update product', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        db = db.req;
        const deletedProduct = await db.collection.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json({ message: 'Product deleted successfully', deletedProduct });
    } catch (err) {
        console.error('Failed to delete product', err);
        res.status(500).send('Internal Server Error');
    }
};


exports.haha = (req, res) => {
    return res.send('test')
}