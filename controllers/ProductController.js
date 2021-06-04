const Category = require('../models/Category');
const Product = require('../models/Product');


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
    }
}