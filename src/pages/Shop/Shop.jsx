import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
// import { useParams } from "react-router-dom";

const Shop = () => {
  const[products,setProducts]=useState([])
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
  
    const fetchProducts=async()=>{
      try {
        setLoading(true)
        const res=await fetch("./data/products.json")
        const data=await res.json()
        const allProducts=data.categories.flatMap((cat)=>cat.products)
        console.log(allProducts)
        setProducts(allProducts);  
      } catch (error) {
        console.error("Error fetching JSON:", error)
      }
      finally{
        setTimeout(() => {
          setLoading(false);          
        }, 800);      }
      
    }
    
    fetchProducts()
  },[])

  return (
     <div className="mt-5 container-fluid">
      <div className=' col-12 mt-5 ustify-content-center text-center mb-5'>
           <h2 className="headline">Shop Section</h2>
          </div>
          
      <div  className="row  g-4" >
        {loading
          ? Array(8).fill(0).map((_, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-3">
                <Cards isSkeleton />
              </div>
            ))
          : products.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-3">
                  <Cards
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item.id}
                    
                  />
              </div>
            ))}
        </div>
    </div>
  );
};

export default Shop;