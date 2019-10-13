import React from 'react';
import { Row, Col} from "react-bootstrap";

const style = {
    position: "relative",
    height: "56px!important",

};
const imgStyle = {
    maxHeight: "60px",
};

function ProductItem({productPrice, productName, productSeller, productImg}) {
   return <div style={style}>
                <Row>
                    <Col>
                        <img style={ imgStyle } src={productImg}/>
                    </Col>
                    <Col>
                        <h4>{productPrice}</h4>
                        <h6>{productName}</h6>
                    </Col>
                    <Col>
                        <p>{productSeller}</p>
                    </Col>
                </Row>
         </div>
}

export default ProductItem;