import React from 'react';

function ProductDescription({ itemPicture, productDescription }) {
     return  <div className={"details-left"}>
                 <div className={"details-img"}>
                     <img src={itemPicture} alt={"details-img"}/>
                 </div>
                <h2> Descripción del producto </h2>
                <p >{ productDescription }</p>
            </div>
}

export default ProductDescription