import React from 'react';
import "../../styles/product/priceItem.css";
import Helper from "../../helpers/helpers";

function PriceItem({productAmount, productDecimals}) {
    return <fieldset className="item-price ">
			<span className="price-tag">
				<span className="price-tag-symbol" content="559.99">$</span>
				<span className="price-tag-fraction">{Helper.formatPrice(productAmount)}</span>
					<span className="price-tag-decimal-separator">,</span>
					<span className="price-tag-cents">{productDecimals === 0 ? "00" : productDecimals }</span>
			</span>
    </fieldset>
}

export default PriceItem;