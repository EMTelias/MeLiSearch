const express = require('express');
const rp = require('request-promise');
const config = require('../config/config')
const router = express.Router();
const ITEMS_ENDPOINT = "https://api.mercadolibre.com/items";
const SEARCH_ENDPOINT = "https://api.mercadolibre.com/sites/MLA/search";

function getProductDetails(itemId){
    const options = {
        uri: `${ITEMS_ENDPOINT}/${itemId}`,
        method: "GET"
    };

    return rp(options)
        .then((responseData) => JSON.parse(responseData));
}

function getProductDescription(itemId){
    const options = {
        uri: `${ITEMS_ENDPOINT}/${itemId}/description`,
        method: "GET"
    };

    return rp(options).then((responseData) => JSON.parse(responseData));
}
function getProductListFromQuerySearch(queryString){
    const options = {
        uri: `${SEARCH_ENDPOINT}`,
        qs: {
            q: queryString, // -> uri + '?q=queryString'
            limit: 4,
        },
        method: "GET"
    };

    return rp(options)
        .then((responseData) =>{
            return JSON.parse(responseData).results;
        })
        .catch((err) => {
            console.log("err" + err);
        });
}

router.get('/:itemId', async (req, res) => {
    const { itemId } = req.params;

    const product = await getProductDetails(itemId);
    const productDescription = await getProductDescription(itemId);
    const price = Math.trunc(product.price);
    const decimal = Number((product.price-price).toFixed(2));
    const responseData = {
        author: {
            name: config.AUTHOR_NAME,
            lastName: config.AUTHOR_LASTNAME,
        },
        item: {
            id: product.id,
            title: product.title,
            price: {
                currency: product.currency_id,
                amount: price,
                decimals: decimal,
            },
            picture: product.pictures && product.pictures[0] ? product.pictures[0].url : null,
            condition: product.condition,
            free_shipping: product.shipping.free_shipping,
            sold_quantity: product.sold_quantity,
            description: productDescription.plain_text
        }
    };
    res.json(responseData)
});

router.get('/', async (req, res) => {
    const { q } = req.query;
    const productsFromSearch = await getProductListFromQuerySearch(q);
    let productList = productsFromSearch.map( (product) => {
        const price = Math.trunc(product.price);
        const decimal = Number((product.price-price).toFixed(2));

        return {
            author: {
                name: config.AUTHOR_NAME,
                    lastName: config.AUTHOR_LASTNAME,
            },
            categories: [],
            item: {
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
            }
        };
    });
    res.json(productList);
});

module.exports = router;
