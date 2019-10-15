import React from 'react';
import {Redirect} from "react-router";
import searchIcon from '../../img/search.ico' // relative path to image

export class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            redirectToSearch: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = () => {
        this.setState({
            redirectToSearch: true
        });
    };

    changeHandler = event => {
        this.setState({
            searchQuery: event.target.value
        });
    };

    render() {
        const redirectToSearch = this.state.redirectToSearch;
        if (redirectToSearch) {
            const searchQuery = this.state.searchQuery;
            this.setState({redirectToSearch : false, searchQuery: ""}); // prevents Searchbox to stop rendering an clean searchBox
            return <Redirect  to={`/items?search=${searchQuery}`} />
        }

        return (
            <div className={"search-box"}>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.state.searchQuery}
                        type="text"
                        onChange={this.changeHandler}
                        placeholder="Nunca dejes de buscar"/>
                    <button type={'submit'}>
                        <div id="">
                            <img src={searchIcon}/>
                        </div>
                    </button>
                </form>
            </div>
        );
    }
};