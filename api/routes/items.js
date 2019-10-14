const express = require('express');
const config = require('../config/config');
const MeLiClient = require('../client/meliClient');
const helper = require('../helpers/helpers');
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

        const responseData = {
            author: {
                name: config.AUTHOR_NAME,
                lastName: config.AUTHOR_LASTNAME,
            },
            item: {
                id: productDetails.id,
                title: productDetails.title,
                price: {
                    currency: productDetails.currency_id,
                    amount: price.amount,
                    decimals: price.decimals,
                },
                categories: productCategories,
                picture: productDetails.pictures && productDetails.pictures[0] ? productDetails.pictures[0].url : null,
                condition: productDetails.condition,
                free_shipping: productDetails.shipping.free_shipping,
                sold_quantity: productDetails.sold_quantity,
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
        if (categoryFilter.values.length > 0) {
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
                name: config.AUTHOR_NAME,
                lastName: config.AUTHOR_LASTNAME,
            },
            categories: mainCategoriesFromSearch,
            items: productList
        };

        res.json(response);
    }catch (e) {
        console.log(e);
        res.status(500).send( "Internal server error");
    }
});

module.exports = router;
