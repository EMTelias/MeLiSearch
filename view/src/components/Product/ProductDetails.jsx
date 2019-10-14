import React from 'react';
import { Row, Col,Button} from "react-bootstrap";
import "../../styles/product/productDetails.css";


function ProductDetails({itemState, itemsSold, itemName, itemPrice}) {
    return <section className={"details-info"}>
                <div className={"item-state"}>{` ${itemState} : ${itemsSold} vendidos `}</div>
                <header>
                    <h1 className={"item-title"}>{itemName}</h1>
                </header>
                <span className={"item-price"}>$ {new Intl.NumberFormat("de-DE").format(itemPrice)}</span>
                <button variant="primary">Comprar</button>
            </section>
}

export default ProductDetails;



