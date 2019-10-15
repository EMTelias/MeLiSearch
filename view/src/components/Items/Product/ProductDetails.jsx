import React from 'react';
import "../../../styles/product/productDetails.css";
import PriceItem from "./PriceItem";


function ProductDetails({itemState, itemsSold, itemName, itemPrice}) {
    return <section className={"details-info"}>
                <div className={"item-state"}>{` ${itemState === "new" ? "Nuevo" : "Usado" } : ${itemsSold} vendidos `}</div>
                <header>
                    <h1 className={"item-title"}>{itemName}</h1>
                </header>
                <PriceItem productAmount={itemPrice.amount} productDecimals={ itemPrice.decimals }/>
                <button aria-label="Buy" variant="primary">Comprar</button>
            </section>
}

export default ProductDetails;



