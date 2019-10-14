import React from 'react';
import {Container} from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import {API_ENDPOINT} from "../../config/config"
import "../../styles/product/productDetails.css"
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            error: null,
            item: {},
        };
    }

    getItemDetailsFromAPI(itemId){
        fetch(`${API_ENDPOINT}/api/items/${itemId}`)
            .then(res => {
                return res.json();
            })
            .then(response => {
                this.setState({
                    isFetching: false,
                    error: response.error,
                    item: response
                });
            });
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.getItemDetailsFromAPI(params.itemId);
    }

    componentWillMount = () => {
         this.setState({
             isFetching: true
         });
     };

    render() {
        const {isFetching, item, error} = this.state;
        const product = item.item;
        if (error) {
                return <p>{"ERROR PAGE"}</p>;
        }
        else if (isFetching){
            return <div><p> Loading...</p> </div>
        }
        return (
                <div>
                    <Breadcrumb productCategoriesArray={product.categories}/>
                    <Container className={"product-container"}>
                        <div className={"details-container"}>
                            <ProductDescription itemPicture={product.picture} productDescription={product.description} />
                            <ProductDetails itemState={product.condition} itemsSold={product.sold_quantity} itemName={product.title} itemPrice={product.price.amount} />
                        </div>
                    </Container>
                </div>
            );
        }
}