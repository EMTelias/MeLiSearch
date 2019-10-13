import React from 'react';

const style = {
    color: "#999",
};

function ProductCategories({ productCategories }) {
     return <div style={style}>
                <p>{productCategories}</p>
            </div>
}

export default ProductCategories;