import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1737719579/Group_7484_wgi18b.png"
      alt="page not found pic"
      className="notfound-image"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-description">
      we're sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/" className="link-item">
      <button type="button" className="home-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
