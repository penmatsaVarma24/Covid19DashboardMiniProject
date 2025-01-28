import {Component} from 'react'

import {Link} from 'react-router-dom'

import {CgPlayList} from 'react-icons/cg'

import './index.css'

class Header extends Component {
  render() {
    return (
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
          <div className="mobile-view-container">
            <button type="button" className="mobile-icon-btn">
              <CgPlayList className="mobile-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
