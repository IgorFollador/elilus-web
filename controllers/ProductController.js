const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');

const jwt_decode = require('jwt-decode');

module.exports = {
    listAll: async function (req, res) {
        const products = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: 'category',
                        attributes: ['description']}]
            });

            ///Tentativa para verificar quais produtos estao favoritados
            // if(req.header('authorization-token')){
            //     const userId = jwt_decode( req.header('authorization-token'));
            //     console.log(userId);
            //     products.forEach(async product => {
            //         const selectFavorite =  await Favorite.findOne({where: {id_product: product.id, id_user: userId}});
            //         if(selectFavorite){
            //             console.log(selectFavorite.id_product)
            //         }
            //     });  
            // }
            
            
        return res.json(products);
    },

}