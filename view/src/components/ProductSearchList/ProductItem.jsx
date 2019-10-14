import React from 'react';

const style = {
    position: "relative",
    height: "56px!important",

};
const imgStyle = {
    maxHeight: "60px",
};

function ProductItem({productPrice, productName, productSeller, productImg}) {
   return <div style={style}>
                <div className={"product-row"}>
                    <div className={"product-column product-left"}>
                        <img style={ imgStyle } src={productImg}/>
                    </div>
                    <div className={"product-column product-center"}>
                        <h4>$ {new Intl.NumberFormat("de-DE").format(productPrice)}</h4>
                        <h6>{productName}</h6>
                    </div>
                    <div className={"product-column product-right"}>
                        <p>{productSeller}</p>
                    </div>
                </div>
         </div>
}

export default ProductItem;