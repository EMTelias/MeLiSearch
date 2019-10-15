const express = require('express');
const MeLiClient = require('../client/meliClient');
const helper = require('../helpers/helpers');
const config = require('../config/config');
const router = express.Router();

router.get('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const meliClient = new MeLiClient().getInstance();

    const productDetails = await meliClient.getProductDetails(itemId);
    if (productDetails.error) {
        const error = JSON.parse(productDetails.error);
        res.status(error.status).send( error.message );
        return;
    }

    const productCategoriesFromCategoryId = await meliClient.getProductCategories(productDetails.category_id);

    try {
        const productCategories = helper.getCategoriesPathFromRootArray(productCategoriesFromCategoryId);
        const productDescription = await meliClient.getProductDescription(itemId);

        const price = helper.getPriceWithDecimalsObject(productDetails.price);

        const {id, title, currency_id, pictures, condition, shipping, sold_quantity} = productDetails;
        const responseData = {
            author: {
                name: config.author.name,
                lastName: config.author.lastname,
            },
            item: {
                id: id,
                title: title,
                price: {
                    currency: currency_id,
                    amount: price.amount,
                    decimals: price.decimals,
                },
                categories: productCategories,
                picture: pictures && pictures[0] ? pictures[0].url : null,
                condition: condition,
                free_shipping: shipping.free_shipping,
                sold_quantity: sold_quantity,
                description: productDescription.plain_text,
            }
        };
        res.json(responseData)
    }catch (e) {
        res.status(500).send( "Internal server error");
    }
});


router.get('/', async (req, res) => {
    const { q } = req.query;
    const meliClient = new MeLiClient().getInstance();

    const productsFromSearch = await meliClient.getProductListFromQuerySearch(q);

    if (productsFromSearch.results.length === 0) {
        res.status(404).send( "There are no items with that query search");
        return;
    }

    try {
        const categoryFilter = productsFromSearch.filters.find((item) => item.id === "category");
        let mainCategoriesFromSearch = [];
        if ( categoryFilter && categoryFilter.values && categoryFilter.values.length > 0) {
            mainCategoriesFromSearch = helper.getCategoriesPathFromRootArray(categoryFilter.values[0]);
        }

        let productList = productsFromSearch.results.map((product) => {
            const price = helper.getPriceWithDecimalsObject(product.price);

            return {
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: price.amount,
                    decimals: price.decimals,
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
                sold_quantity: product.sold_quantity,
                description: product.plain_text,
                state: product.address.state_name

            };
        });

        const response = {
            author: {
                name: config.author.name,
                lastName: config.author.lastname,
            },
            categories: mainCategoriesFromSearch,
            items: productList
        };

        res.json(response);
    }catch (e) {
        res.status(500).send( "Internal server error");
    }
});

module.exports = router;
