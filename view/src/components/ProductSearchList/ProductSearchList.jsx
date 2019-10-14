import React from 'react';
import {Container, Row} from "react-bootstrap";
import ProductItem from "./ProductItem";
import queryString from "query-string"
import {API_ENDPOINT} from "../../config/config";
import "../../styles/searchList/productList.css";

import {Link} from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export class ProductSearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            error: null,
            items: [],
        };
    }

    getItemListSearchFromAPI(queryString){
        fetch(`${API_ENDPOINT}/api/items?q=${queryString}`)
            .then(res => {
                return res.json();
            })
            .then(response => {
                this.setState({
                    isFetching: false,
                    items: response.items,
                    categories: response.categories,
                    error: response.error
                });
            });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search ){
            const searchQuery = queryString.parse(this.props.location.search);
            this.getItemListSearchFromAPI(searchQuery.search);
        }

    }

    componentDidMount() {
        const searchQuery = queryString.parse(this.props.location.search);
        this.getItemListSearchFromAPI(searchQuery.search);
    }

    componentWillMount = () => {
    };

    render() {
        const {isFetching, items, error, categories} = this.state;
        console.log(error);
        if (error) {
            return <p>{"ERROR PAGE"}</p>;
        }
        else if (isFetching){
            return <div ><p> Loading...</p> </div>
        }

        return (
            <div>
                <Breadcrumb productCategoriesArray={categories}/>
                <Container className={"product-container"}>
                    {items.map( (product) => {
                        const item = product;
                        return <ul key={item.id}>
                                    <Link to={`/items/${item.id}`}>
                                        <ProductItem key={item.id} productPrice={item.price.amount} productName={item.title} productSeller={item.condition} productImg={item.picture}/>
                                    </Link>
                               </ul>
                    })}
                </Container>
            </div>
        );
    }
}