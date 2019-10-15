import React from 'react';
import {Container} from "react-bootstrap";
import ProductItem from "./ProductItem";
import queryString from "query-string"
import {API_ENDPOINT} from "../../../config/config";
import {Link} from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import NotFound from "../Error/NotFound";
import "../../../styles/searchList/productList.css";import "../../../styles/searchList/productList.css";

export class ProductSearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            items: [],
            categories: [],
            error: null
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
            })
            .catch((error) => this.setState({ error : error }));;
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

        if (error) {
            return <NotFound notFoundMessage={"No hay publicaciones que coincidan con tu búsqueda."}/>
        }
        else if (isFetching){
            return null;
        }

        return (
            <div>
                <Breadcrumb productCategoriesArray={categories}/>
                <Container className={"product-container"}>
                    {items.map( (product) => {
                        return <ul key={product.id}>
                                    <Link to={`/items/${product.id}`}>
                                        <ProductItem key={product.id} productPrice={product.price.amount} productName={product.title} productSeller={product.state} productImg={product.picture}/>
                                    </Link>
                               </ul>
                    })}
                </Container>
            </div>
        );
    }
}