// WMSOnline-backend/controllers/productController.js

const Product = require('../models/product');
const Group = require('../models/group');

const createProduct = async (req, res) => {
    const { name, description, quantity, price, groupId } = req.body;
    try {
        const product = await Product.create({ name, description, quantity, price, groupId });
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ include: [{ model: Group, as: 'group' }] });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, { include: [{ model: Group, as: 'group' }] });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price, groupId } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.quantity = quantity !== undefined ? quantity : product.quantity;
        product.price = price || product.price;
        product.groupId = groupId || product.groupId;
        await product.save();
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
