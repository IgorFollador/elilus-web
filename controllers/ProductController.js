const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');

module.exports = {
    listAll: async function (req, res) {
        const products = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: 'category',
                        attributes: ['description']}]
            });
        const selectFavorite =  await Favorite.findOne({where: {id_product: products.id, id_user: req.userId}});
        return res.json(products);
    },

}