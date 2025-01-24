import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-container">
    <div className="responsive-container">
      <div className="website-logo-container">
        <Link to="/" className="link-item">
          <p className="website-logo">
            COVID19<span className="logo-span-item">INDIA</span>
          </p>
        </Link>
      </div>
      <ul className="route-container">
        <Link to="/" className="link-item">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/about" className="link-item">
          <li className="list-item">About</li>
        </Link>
      </ul>
    </div>
  </div>
)

export default Header
