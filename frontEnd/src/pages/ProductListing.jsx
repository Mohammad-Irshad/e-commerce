import Header from "../components/Header"
import Footer from "../components/Footer"
import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import useFetch from "../useFetch"
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, addToWishList, fetchProducts, setSearchProducts, setSortBy, updateProductById } from "./features/productsSlice"


const ProductListing = () => {
  const { selectedCategory } = useParams()
  const initialCategory = selectedCategory ? [selectedCategory] : []
  const [rating, setRating] = useState(5)
  const [category, setCatrgory] = useState(initialCategory)

  const [showAddCartAlert, setShowAddCartAlert] = useState(false)
  const [showAddWishlistAlert, setShowAddWishlistAlert] = useState(false)

  const dispatch = useDispatch()

  // const {data, loading, error} = useFetch("http://localhost:3000/products")

  const {products : data, status , error, sortBy, searchProducts, cart} = useSelector((state) => state.products)
  console.log(cart)

  // searchProducts ? console.log(searchProducts) : console.log("searchProducts are loading")

  const handleAddToWishListe = (pro) => {
    // dispatch(addToWishList(pro))
    const updatedData = {wishList : true}
    dispatch(updateProductById({productId : pro._id, updatedData}))
    setShowAddCartAlert(false)
    setShowAddWishlistAlert(true)
  }

  const handleAddtoCart = (pro) => {
    // dispatch(addToCart({...pro, qty : pro.qty ? pro.qty + 1 : 1})) 
    if(pro.cart){
      dispatch(addToCart(pro))
    }else{
        const updatedData = {cart : true}
        dispatch(updateProductById({productId : pro._id, updatedData}))            
    }   
    setShowAddWishlistAlert(false)
    setShowAddCartAlert(true)
  }

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(setSearchProducts(''))
  },[])

  
  const products = searchProducts.length > 0 ?
   searchProducts.filter(pro => (category.length === 0 || category.includes(pro.categoryName)) && pro.rating <= rating) : 
   data ? data.filter(pro => (category.length === 0 || category.includes(pro.categoryName)) && pro.rating <= rating)
  : []  

  const handleCheckboxChange = (e) => {
    const {value , checked} = e.target
    if(checked){
      setCatrgory([...category, value])
    }else{
      setCatrgory( category.filter( cate => cate !== value))
    }
  }

  const isCategoryChecked = (cat) => {
    return category.includes(cat)
  }

  const clearFilter = () => {
    setRating(5)
    setCatrgory('')
    dispatch(setSortBy("All"))
  }


  const sortByPrice = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  products.sort((a, b) => {
    if(sortBy === "All"){
      return true
    }else if(sortBy === "Low to High"){
      return a.price - b.price
    }else{
      return b.price - a.price
    }
  })
  
  return (
    <>
      <Header/>
      <main className="">
        <div className="row px-4">
          
          <div className="col-md-2">
              <div className="col">
                <p> <strong>Filters</strong> </p>
                <br/>
                <label htmlFor="rating"> <strong>Rating:</strong></label>
                <span className="px-4">{rating}</span>
                <br/>
                <input type="range" id="rating" name="itemRating" min="1" max="5" step=".1" value={rating} onChange={e => setRating(parseFloat(e.target.value))} />
                <br/>
                <span>Min To {rating}</span>
                <br/><br/>
                <label> <input type="checkbox" value="Travel Bags and Luggage" name="productCategory" onChange={handleCheckboxChange} checked={isCategoryChecked("Travel Bags and Luggage")} /> Travel Bags and Luggage  </label>
                <br/>
                <label> <input type="checkbox" value="Travel Accessories" onChange={handleCheckboxChange} checked={isCategoryChecked("Travel Accessories")} /> Travel Accessories  </label>
                <br/>
                <label> <input type="checkbox" value="Electronics and Gadgets" onChange={handleCheckboxChange} checked={isCategoryChecked("Electronics and Gadgets")} />  Electronics and Gadgets  </label>
                <br/>
                <label> <input type="checkbox" value="Outdoor and Adventure Gear" onChange={handleCheckboxChange} checked={isCategoryChecked("Outdoor and Adventure Gear")}/> Outdoor and Adventure Gear  </label>            
                <br/>
                <br/>
                <label> <input type="radio" value="Low to High" name="sortByPrice" onClick={(e) => sortByPrice(e)} /> Low to High </label><br/>
                <label> <input type="radio" value="High to Low" name="sortByPrice" onClick={(e) => sortByPrice(e)} /> High to Low </label>

                <br/><br/>
                <button className="btn btn-primary" onClick={clearFilter}>Clear Filter</button>
              </div>
          </div>
          
          <div className="col-md-9">          
            <h3>Showing All Products</h3>
            <div>
            {
              showAddCartAlert && 
              <div className="alert alert-warning" role="alert">
                  Product added to the cart successfully!
              </div>
            }
            {
              showAddWishlistAlert && 
              <div className="alert alert-primary" role="alert">
                  Product added to the wishlish successfully!
              </div>
            }
            </div>
            <div className="row">
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>An error occured while fetching the products.</p>}
            {products && products.length ? (
              products.map( pro => (                
                  <div key={pro._id} className="col-md-4 py-2">
                    <div  className="card" >
                      <Link to={`/productListing/products/${pro._id}`} className="text-decoration-none text-reset">
                      <img src={pro.productImageUrl} className="card-img-top" alt="..." style={{ height: "20vw", objectFit: "cover" }} />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{pro.name}</h5>
                        <p className="card-text">{pro.productDescription}</p>
                        <p>Ratings : {pro.rating}</p>
                        <p>Price : Rs. { pro.price - ((pro.price) * (pro.discount == 0 ? 1 : pro.discount) /100)}  Discount : {pro.discount}%</p>                        
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-warning" onClick={() => handleAddtoCart(pro)}>Add to cart</button>
                          <button className="btn btn-primary ms-2" onClick={() => handleAddToWishListe(pro)}>Add to wishlist</button>
                        </div>                        
                      </div>
                      
                    </div>
                  </div>                
              ))
            )
            :
            <p>Sorry we don't have any products for now!</p>
            }
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default ProductListing