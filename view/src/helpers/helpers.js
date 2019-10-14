module.exports = {

    // Function that receives number and returns it with the selected format
    formatPrice(number){
        return  new Intl.NumberFormat("de-DE").format(number);
    }
};


