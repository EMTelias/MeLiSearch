const express = require('express');
const config = require('../config/config');
const MeLiClient = require('../client/meliClient');
const helper = require('../helpers/helpers');
const router = express.Router();

router.get('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const meliClient = new MeLiClient().getInstance();

    const productDetails = await meliClient.getProductDetails(itemId);
    const productCategoriesFromCategoryId = await meliClient.getProductCategories(productDetails.category_id);

    const productCategories = helper.getCategoriesPathFromRootArray(productCategoriesFromCategoryId);
    const productDescription = await meliClient.getProductDescription(itemId);

    const price = Math.trunc(productDetails.price);
    const decimal = Number((productDetails.price-price).toFixed(2));

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
                amount: price,
                decimals: decimal,
            },
            categories: productCategories,
            picture: productDetails.pictures && productDetails.pictures[0] ? productDetails.pictures[0].url : null,
            condition: productDetails.condition,
            free_shipping: productDetails.shipping.free_shipping,
            sold_quantity: productDetails.sold_quantity,
            description: productDescription.plain_text
        }
    };
    res.json(responseData)
});


router.get('/', async (req, res) => {
    const { q } = req.query;
    const meliClient = new MeLiClient().getInstance();

    const productsFromSearch = await meliClient.getProductListFromQuerySearch(q);

    const categoryFilter = productsFromSearch.filters.find((item) => item.id === "category");
    let mainCategoriesFromSearch =  [];
    if (categoryFilter.values.length > 0){
        mainCategoriesFromSearch = helper.getCategoriesPathFromRootArray(categoryFilter.values[0]);
    }

    let productList = productsFromSearch.results.map( (product) => {
        const price = Math.trunc(product.price);
        const decimal = Number((product.price-price).toFixed(2));
        return {
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: price,
                    decimals: decimal,
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
                sold_quantity: product.sold_quantity,
                description: product.plain_text
        };
    });

    const response = {
        author: {
            name: config.AUTHOR_NAME,
            lastName: config.AUTHOR_LASTNAME,
        },
        categories: mainCategoriesFromSearch,
        items : productList
    };

    res.json(response);
});

module.exports = router;
