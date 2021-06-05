const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite')

module.exports = {
    listAll: async function (req, res) {
        const products = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: 'category',
                        attributes: ['description']}]
            });
        return res.json(products);
    },

    getFavorites: async function (req, res) {
        const products = await Favorite.findAll({
            where: { id_user: req.userId },
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Product,
                        as: 'product',
                        attributes: ['id', 'description', 'path_image']}]
            });
        return res.json(products);
    }
}