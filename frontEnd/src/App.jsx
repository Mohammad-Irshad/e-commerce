import { Link } from 'react-router-dom'
// import Footer from '../components/Footer'
// import Header from '../components/Header'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import useFetch from './useFetch'

export default function App() {
  
  const {data, loading, error} = useFetch("http://localhost:3000/categories")
  
  return (
    <>
      <Header/>
      <main>
        <section className='container'>
          
          <div className='row'>
            {loading && <p>Loading...</p>}
            {error && <p>An error occured while fetching the categories.</p>}
            {data && data.length && (
              data.map(category => (
                <div key={category.categoryName} className='col-md-3'>
                  <div className='card'>
                    <div className="card">
                      <img src={category.categoryImageUrl} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{category.categoryName}</h5>
                        <p className="card-text">{category.categoryDescription}</p>
                        <Link to={`/productListing/${category.categoryName}`} className="btn btn-primary">View Products</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
        <section className='container py-3'>
          <img src='https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Travel Accessories pic' className='img-fluid' />
        </section>

        <section className=''>
          
        </section>
        
      </main>
      <Footer/>
    </>
    
  )
}
