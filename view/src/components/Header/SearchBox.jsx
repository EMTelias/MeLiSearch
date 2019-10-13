import React from 'react';
import Form  from 'react-bootstrap/Form';
import Container  from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import {Redirect} from "react-router";

const buttonStyle = {
    width: "30px",
}

const inputStyle = {
    width: "600px",
}
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
            this.setState({redirectToSearch : false}); // prevents Searchbox to stop rendering
            return <Redirect  to={`/items?search=${this.state.searchQuery}`} />
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className={"search-box"}>
                        <input
                            value={this.state.searchQuery}
                            type="text"
                            onChange={this.changeHandler}
                            placeholde  r="Nunca dejes de buscar"/>
                        <button style={buttonStyle} type={'submit'}/>
                    </div>
                </form>
            </div>
        );
    }
};