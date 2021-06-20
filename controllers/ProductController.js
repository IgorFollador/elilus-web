const Category = require('../models/Category');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');

const jwt_decode = require('jwt-decode');

module.exports = {
    listAll: async function (req, res) {
        const productsDB = await Product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Category,
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
        if (token != 'null' && token != null) {
            const userId = jwt_decode(req.header('authorization-token'));

            products.forEach(async product => {
                product.fav = false;
                const selectFavorite = await Favorite.findOne({ where: { id_product: product.id, id_user: userId.userId } });
                if (selectFavorite)
                    product.fav = true;
            });
        }
        setTimeout(function () {
            return res.json(products);
        }, 100);
    },

    //Busca de produtos
    searchAll: async function (req, res) {
        const { Op } = require('sequelize');
        if (!req.query.q) {
            return res.render('../resources/views/search', { results: 0, listSearch: [], img: '../img/not_found_search.png' });
        } else {
            const query = `%${simplify(req.query.q)}%`;
            const productsDB = await Product.findAndCountAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['description']
                }],
                where: { description: { [Op.like]: query } }
            });

            const products = JSON.parse(JSON.stringify(productsDB));
            if (products.count == 0) {
                return res.render('../resources/views/search', { results: 0, listSearch: [], img: '../img/not_found_search.png' });
            }
            ///Verifica quais produtos estao favoritados
            if (req.headers.cookie) {
                let token = "";
                for (var i = 20; i < req.headers.cookie.length; i++) token += req.headers.cookie[i]; //separa o token
                if (token != 'null' && token != null) {
                    const userId = jwt_decode(token);

                    (products.rows).forEach(async product => {
                        product.fav = false;
                        const selectFavorite = await Favorite.findOne({ where: { id_product: product.id, id_user: userId.userId } });
                        if (selectFavorite)
                            product.fav = true;
                    });
                }
            }

            setTimeout(function () {
                //GERANDO LISTA DE BUSCA
                let productElements = '';
                let favs;
                let color;
                let tag;
                products.rows.forEach((product) => {
                    if (product.fav) {
                        favs = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`
                        color = `rgb(179, 54, 54)`
                        tag = `"Remover favorito"`
                    } else {
                        favs = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
                        color = ``;
                        tag = `"Add aos favoritos"`
                    }
                    let productElement = ` <div class="col-md-4 col-sm-6">
											<div class="product-grid2">
												<div class="product-image"><img class="pic-1" src=${product.path_image} alt="pic-1">
													<ul class="like">
														<li>  
															<a data-tip=${tag} onclick='setFavorite(${product.id})' onmouseover="this.style.backgroundColor='${color}'";>
																${favs}
															</a>
														</li>
													</ul>
												</div>
												<div class="product-content">
													<h3 class="title">${product.description}</h3> <span class="price">ID ${product.id}</span>
												</div>
											</div>
										</div>`
                    productElements += productElement;
                });
                //Renderizando busca
                return res.render('../resources/views/search', { results: products.count, listSearch: productElements, img: '' });
            }, 100);
        }
    }
}

function simplify(text) {
    const separators = new RegExp(`s,.;:()-'+`);
    const diacritics = new RegExp(`u0300-u036f`);
    //capitalização e normalização
    text = text.toUpperCase().normalize("NFD").replace(diacritics, "");
    //separando e removendo repetidos
    const arr = text.split(separators).filter((item, pos, self) => self.indexOf(item) == pos);
    //removendo nulls, undefineds e strings vazias
    return arr.filter(item => (item));
}