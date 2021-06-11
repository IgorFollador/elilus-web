const Category = require('../models/Category');

module.exports = {
    listAll: async function (req, res) {
        const categories = await Category.findAll({
            attributes: { 
                exclude: ['createdAt', 'updatedAt']}, 
                order: [
                    ['id', 'ASC'],
                    ['description', 'ASC'],
                ],
            });
            return res.json(categories);
    },

}