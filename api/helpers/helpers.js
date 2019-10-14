module.exports = {

    // Function that receives a category and returns an array with all categories from root
    getCategoriesPathFromRootArray(category){
        return  category.path_from_root.map(( category ) => category.name);
    },

    //Function that receives a number with decimals and returns an object { amount: number, decimal: number}
    getPriceWithDecimalsObject(number){
        const amount = Math.trunc(number);
        const decimals = Number((number - amount).toFixed(2));
        return { amount, decimals };
    }
};


