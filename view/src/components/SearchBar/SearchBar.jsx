import React from 'react';
import {SearchBox} from "./SearchBox";
import "../../styles/header/searchBox.css";
import meliBrand from '../../img/meli-brand.png' // relative path to image

export class SearchBar extends React.Component {
    componentWillMount = () => {
    };

    render() {
        return (
            <div className={"nav-search-bar"}>
                <div className={"nav-container"}>
                    <div className={"nav-brand"}>
                        <img
                            src={meliBrand}
                            className=""
                        />
                    </div>
                    <SearchBox/>
                </div>
            </div>
        );
    }
};