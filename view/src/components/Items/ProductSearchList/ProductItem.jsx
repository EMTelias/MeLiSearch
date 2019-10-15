import React from 'react';
import PriceItem from "../Product/PriceItem";
import Helper from "../../../helpers/helpers";


function ProductItem({productPrice, productName, productImg,  productSeller}) {
   return <div >
                <div className={"product-row"}>
                    <div className={"product-column product-left"}>
                        <img alt={"product-img"} src={productImg}/>
                    </div>
                    <div className={"product-column product-center"}>
                        <h4>$ {Helper.formatPrice(productPrice)}</h4>
                        <h5>{productName}</h5>
                    </div>
                    <div className={"product-column product-right"}>
                        <p>{productSeller}</p>
                    </div>
                </div>
         </div>
}

export default ProductItem;