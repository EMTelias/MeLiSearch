import React from 'react'
import {Link} from "react-router-dom";
import "../../../styles/breadcrumb/breadcrumb.css";
const breadcrumbSeparator = ">"
// Returns the breadcrumb separated with an "/" except for the last item
function Breadcrumb({ productCategoriesArray }){
     return <ul className={"breadcrumb-bar"}>
             {productCategoriesArray.map((category, index) => (
                 <li>
                     <Link key={category} to={`/items?search=${category}`}> {category} </Link>
                     { index !== productCategoriesArray.length-1 ? breadcrumbSeparator : null}
                 </li>
                 ))}
            </ul>
}

export default Breadcrumb