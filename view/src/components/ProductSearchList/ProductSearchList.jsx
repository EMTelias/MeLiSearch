import React from 'react';
import {Container, Row} from "react-bootstrap";
import ProductItem from "./ProductItem";
import ProductCategories from "../Product/ProductCategories";
import queryString from "query-string"
import {API_ENDPOINT} from "../../config/config";
import {shallowCompare} from "../../utils/utils"
import {Link} from "react-router-dom";
const style = {
    background: "#fff",
};

const layoutStyle = {
        margin: "auto",
        maxWidth: "1220px",
};

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
            .then(items => {
                this.setState({
                    isFetching: false,
                    items: items
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
        const {isFetching, items, error} = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        else if (isFetching){
            return <div style={style}><p> Loading...</p> </div>
        }

        return (
            <div style={this.layoutStyle}>
                <ProductCategories productDirection={"Nuevo > Iphone > Lie > Not an iphone"}/>
                <Container style={this.style}>
                    {items.map( (product) => {
                        const item = product.item;
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