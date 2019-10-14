const rp = require('request-promise');

class MeLiClient {
    constructor() {
        this.itemsEndpoint = "https://api.mercadolibre.com/items" ;
        this.categoriesEndpoint = "https://api.mercadolibre.com/categories";
        this.searchEndpoint = "https://api.mercadolibre.com/sites/MLA/search";
    }

    getProductDetails(itemId){
        const options = {
            uri: `${this.itemsEndpoint}/${itemId}`,
            method: "GET"
        };

        return rp(options)
            .then((responseData) => JSON.parse(responseData))
            .catch((error) => {err: error});
    }

    getProductDescription(itemId){
        const options = {
            uri: `${this.itemsEndpoint}/${itemId}/description`,
            method: "GET"
        };

        return rp(options)
            .then((responseData) => JSON.parse(responseData))
            .catch((error) => {err: error});;
    }

    getProductCategories(categoryId){
        const options = {
            uri: `${this.categoriesEndpoint}/${categoryId}`,
            method: "GET"
        };
        return rp(options)
            .then((responseData) => JSON.parse(responseData))
            .catch((error) =>  error );
    }

    getProductListFromQuerySearch(queryString){
        const options = {
            uri: `${this.searchEndpoint}`,
            qs: {
                q: queryString, // -> uri + '?q=queryString'
                limit: 4,
            },
            method: "GET"
        };
        return rp(options)
            .then((responseData) => JSON.parse(responseData))
            .catch((error) =>  error );
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new MeLiClient();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

module.exports = Singleton;