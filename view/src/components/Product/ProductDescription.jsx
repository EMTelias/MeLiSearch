import React from 'react';

const style = {
    color: "#999",
};

function ProductDescription({ itemPicture, productDescription }) {
     return  <div className={"details-left"}>
                 <div className={"details-img"}>
                     <img src={itemPicture} alt={"img"}/>
                 </div>
                <h2> Descripción del producto </h2>
                <p style={style}>{ productDescription }</p>
            </div>
}

export default ProductDescription