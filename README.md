# MeLi Search
## Installation
In the project directory run the following line to install the project dependencies:

`npm run prereq`

To run the project add the following line

`npm run start`

This will start an instance of the app on [http://localhost:3000](http://localhost:3000).<br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Documentation

![page-view](readme/page-view.PNG)

This project is separated on three different views:

- Search Bar
- Product Details
- Product Search List
### Root

### Search bar
This view is composed from a SearchBar that uses a SearchBox
![search-bar](readme/search-bar.PNG)

####SearchBox
This components builds the following state on creation:

`
this.state = {
             searchQuery: "",
             redirectToSearch: false};
`

The `redirectToSearch` variable allows render the `<Redirect>` component when the search form 
is submitted redirecting to the url `/items?search=` rendering the ProductSearchList
view 

### Product Search List
This view is composed from a ProductSearchList and a ProductItem components.
![product-list](readme/product-list.PNG)

ProductSearchList builds the following state on creation:

`this.state = {
             isFetching: true,
             items: [],
             categories: [],
             error: null
};
`

The `isFetching` state allows to manage the rendering of the product list while fetching the
data from the API.

The `error` state allows to stop the rendering and show a custom error page.

#### Product Item

