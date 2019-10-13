import React from 'react';
import {SearchBox} from "./SearchBox";
import Navbar from "react-bootstrap/Navbar";
import "../../styles/searchBox.css";

export class SearchBar extends React.Component {
    style = {
        backgroundColor: "#fff159",
        border: 0,
        position: "relative",
        height: "56px",
    };


    componentWillMount = () => {
    };

    render() {
        return (
            <div style = {this.style} className={"nav-search-bar"}>
                <div className={"nav-brand"}>
                    <img
                        src="https://www.clipartmax.com/png/middle/77-770022_venta-de-valium-en-mercadolibre-venezuela-mercadolibre-inc.png"
                        width="30"
                        height="30"
                        className=""
                    />
                </div>
                <SearchBox/>
            </div>
        );
    }
};