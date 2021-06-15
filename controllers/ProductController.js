const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');

const jwt_decode = require('jwt-decode');

module.exports = {
    listAll: async function (req, res) {
        const productsDB = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: "category",
                        attributes: ['description'],
                    }],
                order: [
                    ['category', 'description', 'ASC'],
                    ['id', 'ASC'],
                ],
            });
            const products = JSON.parse(JSON.stringify(productsDB)); 
            ///Verificação dos produtos favoritados
            const token = req.header('authorization-token');
            if(token!='null' && token!=null){
                const userId = jwt_decode( req.header('authorization-token'));

                products.forEach(async product => {
                    product.fav=false;
                    const selectFavorite =  await Favorite.findOne({where: {id_product: product.id, id_user: userId.userId}});
                    if(selectFavorite)
                        product.fav = true;
                });
            }
        setTimeout(function() {
                return res.json(products);
        }, 100);   
    },

    //Busca de produtos
    searchAll: async function (req, res) {
        const query = `%${req.query.search}%`;
        console.log(query);
        const productsDB = await Product.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                include: [{model: Category,
                        as: 'category',
                        attributes: ['description']}],
                where: {description: { [Op.like]: query } }
            });
            const products = JSON.parse(JSON.stringify(productsDB)); 

            ///Verifica quais produtos estao favoritados
            const token = req.header('authorization-token');
            if(token!='null' && token!=null){
                const userId = jwt_decode( req.header('authorization-token'));

                products.forEach(async product => {
                    product.fav=false;
                    const selectFavorite =  await Favorite.findOne({where: {id_product: product.id, id_user: userId.userId}});
                    if(selectFavorite)
                        product.fav = true;
                });
            }
        setTimeout(function() {
                return res.json(products);
        }, 100);   
    }
}