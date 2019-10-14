module.exports = {
    // Function that receives a category and returns an array with all categories from root
    getCategoriesPathFromRootArray(category){
        return  category.path_from_root.map(( category ) => category.name);
    }
}


