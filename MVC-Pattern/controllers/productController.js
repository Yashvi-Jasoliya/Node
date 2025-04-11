const Product = require("../models/productModel");

const getProducts = async (req, res) => {
	try {
		const allProducts = await Product.find();

		if (!allProducts || allProducts.length === 0) {
			res.json({
				message: "There is no product",
			});
		}

		res.status(200).json({
			success: true,
			products: allProducts,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const createProducts = async (req, res) => {
	try {
		const { name, price, description, category } = req.body;
		const newProduct = new Product({ name, price, description, category });
		await newProduct.save();
		res.status(200).json({
            message: "Product created successfully!!",
			product: newProduct,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const updateProducts = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, price, description, category } = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ name, price, description, category },
			{ new: true }
		);

		res.status(200).json({
            message: "Product updated successfully!!",
			product: updatedProduct,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

const deleteProducts = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            res.json({
                message: "Product can not found! cant't deleted"
            })
        }

		res.status(200).json({
            message: "Product deleted successfully!!",
			product: deletedProduct,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

module.exports = {
	getProducts,
	createProducts,
	updateProducts,
	deleteProducts,
};
