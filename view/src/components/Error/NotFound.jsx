import React from 'react';
import notFoundSvg from '../../img/notFound.svg'
import "../../styles/error/notFound.css";

function NotFound({ notFoundMessage }) {
    return <div className={"not-found-container"}>
            <div className="search-icon">
                <img src={notFoundSvg} />
            </div>
            <div className="info">
                <h3 className="header__title">
                    { notFoundMessage }
                </h3>
        </div>
    </div>
}

export default NotFound;









