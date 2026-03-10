import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./detail.css"
// import LoginPopup from '../../components/popup/LoginPopup'
import { add } from '../../redux/slice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Cards from '../../components/cards/Cards'
const Detail = () => {
  const dispatch = useDispatch()
  const [popup, setPopup] = useState(false)
  const { id } = useParams()
  const { category } = useParams();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  // console.log("user===>", user);


  const [products, setProducts] = useState([])
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/products.json")
        const data = await res.json()

        let foundProduct = null;
        for (const cat of data.categories) {
          const product = cat.products.find((p) => p.id == id);
          if (product) {
            foundProduct = product;
            break;
          }
        }

        if (foundProduct) {
          setProducts([foundProduct]);

          // Get 4 random products excluding the current one for suggestions
          const allProds = data.categories.flatMap((cat) =>
            cat.products.map(p => ({ ...p, category: cat.name }))
          );
          const related = allProds.filter(p => String(p.id) !== String(id));
          // Shuffle slightly and pick 4
          const shuffled = related.sort(() => 0.5 - Math.random());
          setSuggestedProducts(shuffled.slice(0, 4));
        }

      } catch (error) {
        console.error("Error fetching JSON:", error)
      }

    }
    fetchProducts()
  }, [id])

  const addToCart = (data) => {
    // dispatch an action 
    dispatch(add(data))
    toast.success("product added to  cart sucessfully")
  }

  // console.log("popup", popup);

  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <div className='container'>
        {
          products.map((data) => (
            <div key={data.id} className='product row '>

              <div className='col-md-6 d-flex justify-content-center '>
                <img src={data.image} alt="" className='product-img ' />
              </div>
              <div className='col-md-6 mt-4'>
                <div>
                  <h1>{data.name}</h1>
                </div>
                <div className='mt-4'>
                  <h4>{data.description}</h4>
                </div>
                <div className='mt-4'>
                  <p>Price: ₹{data.price}</p>
                </div>
                <div className='mt-4 d-flex gap-2 flex-wrap'>
                  {data.colors.map((color, idx) => (
                    <div key={idx} className='colors' onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color, cursor: "pointer", border: selectedColor === color ? "2px solid black" : "2px solid #ccc", }}></div>
                  ))}
                </div>
                <div className='mt-4 d-flex gap-2 flex-wrap'>
                  {data.sizes.map((size, idx) => (
                    <button key={idx} className='size-btn' onClick={() => setSelectedSize(size)} style={{ border: selectedSize === size ? " 2px solid rgba(212, 177, 157)" : "2px solid rgb(126, 126, 126)", color: selectedSize === size ? "white" : "rgb(126, 126, 126)", backgroundColor: selectedSize === size ? "rgba(220, 177, 157)" : "rgb(254, 249, 242)" }}>{size} </button>
                  ))}
                </div>
                <div className='mt-4'>
                  <button className='cart-btn p-1 fs-5' onClick={() => { addToCart(data) }}>Add to cart</button>
                </div>
                <div className='mt-4'>
                  <button className='buy-btn p-1 fs-5'>
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          ))
        }

        {/* New Premium Details & Reviews Section */}
        {products.length > 0 && (
          <div className="product-extended mt-5 pt-5">
            <div className="row g-5">
              {/* Product Specifications */}
              <div className="col-lg-5">
                <div className="spec-card shadow-sm p-4 h-100">
                  <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <span className="text-dark">Product</span> Specifications
                  </h4>
                  <div className="spec-item d-flex justify-content-between align-items-center py-3 border-bottom">
                    <span className="text-muted fw-medium">Fabric</span>
                    <span className="fw-bold text-dark">{products[0].details?.fabric || 'Cotton Blend'}</span>
                  </div>
                  <div className="spec-item d-flex justify-content-between align-items-center py-3 border-bottom">
                    <span className="text-muted fw-medium">Fit</span>
                    <span className="fw-bold text-dark">{products[0].details?.fit || 'Regular'}</span>
                  </div>
                  <div className="spec-item d-flex justify-content-between align-items-center py-3 border-bottom">
                    <span className="text-muted fw-medium">Care</span>
                    <span className="fw-bold text-dark">{products[0].details?.care || 'Machine Wash'}</span>
                  </div>
                  <div className="spec-item d-flex justify-content-between align-items-center py-3">
                    <span className="text-muted fw-medium">Origin</span>
                    <span className="fw-bold text-dark">{products[0].details?.origin || 'India'}</span>
                  </div>
                </div>
              </div>

              {/* Customer Reviews */}
              <div className="col-lg-7">
                <div className="reviews-container">
                  <h4 className="fw-bold mb-4 text-dark">Customer Feedback</h4>
                  {products[0].reviews && products[0].reviews.length > 0 ? (
                    <div className="reviews-list">
                      {products[0].reviews.map((review) => (
                        <div key={review.id} className="review-card p-4 mb-4 shadow-sm bg-white rounded-4">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center gap-3">
                              <div className="user-avatar text-white fw-bold d-flex justify-content-center align-items-center rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: 'var(--bg-footer)' }}>
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold">{review.user}</h6>
                                <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                              </div>
                            </div>
                            <div className="star-rating d-flex gap-1" style={{ fontSize: '1.2rem' }}>
                              {/* Render 5 Stars based on rating */}
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-warning" : "text-light"} style={{ textShadow: i < review.rating ? "0 0 2px rgba(243,156,18,0.3)" : "none" }}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="review-text text-secondary mb-0 p-3 rounded" style={{ backgroundColor: 'var(--bg-color)' }}>
                            "{review.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-reviews text-center p-5 bg-light rounded-4 border border-dashed">
                      <p className="text-muted mb-0 fs-5">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <div className="suggested-products mt-5 pt-5 mb-5 border-top">
            <h3 className="fw-bold mb-4 text-center">You May Also Like</h3>
            <div className="row g-4 justify-content-center">
              {suggestedProducts.map((item) => (
                <div key={item.id} className="col-12 col-sm-6 col-md-3">
                  <Cards
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item.id}
                    category={item.category}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail;