import React from 'react';
import {SearchBox} from "./SearchBox";
import Navbar from "react-bootstrap/Navbar";
import {Nav} from "react-bootstrap";

export class SearchBar extends React.Component {
    state = {
    };

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
            <Navbar style = {this.style} className="justify-content-between">
                <Navbar.Brand href="/">
                    <img
                        src="https://www.clipartmax.com/png/middle/77-770022_venta-de-valium-en-mercadolibre-venezuela-mercadolibre-inc.png"
                        width="30"
                        height="30"
                        className=""
                    />
                </Navbar.Brand>
                <SearchBox/>
            </Navbar>
        );
    }
};