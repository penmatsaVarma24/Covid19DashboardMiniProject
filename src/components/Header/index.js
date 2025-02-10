import {Component} from 'react'

import {Link} from 'react-router-dom'

import {CgPlayList} from 'react-icons/cg'

import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {isClicked: false}

  onClickNav = () => {
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  onClickClose = () => {
    this.setState({isClicked: false})
  }

  renderNavbarView = () => (
    <div className="home-close-container">
      <div className="home-about-container">
        <ul className="mobile-route-container">
          <li className="mobile-list-item">
            <Link to="/" className="link-item">
              <button type="button" className="mobile-btn">
                Home
              </button>
            </Link>
          </li>
          <li className="mobile-list-item">
            <Link to="/about" className="link-item">
              <button type="button" className="mobile-btn">
                About
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <li className="mobile-list-item" onClick={this.onClickClose}>
        <IoIosCloseCircle className="mobile-close-icon" />
      </li>
    </div>
  )

  render() {
    const {isClicked} = this.state
    return (
      <>
        <div className="desktop-header-container">
          <div className="responsive-container">
            <div className="website-logo-container">
              <Link to="/" className="link-item">
                <p className="website-logo">
                  COVID19<span className="logo-span-item">INDIA</span>
                </p>
              </Link>
            </div>
            <ul className="route-container">
              <li className="list-item">
                <Link to="/" className="link-item">
                  <button type="button" className="list-item">
                    Home
                  </button>
                </Link>
              </li>
              <li className="list-item">
                <Link to="/about" className="link-item">
                  <button type="button" className="list-item">
                    About
                  </button>
                </Link>
              </li>
            </ul>
            <ul className="mobile-view-container">
              <li className="list-item">
                <button
                  type="button"
                  className="mobile-icon-btn"
                  onClick={this.onClickNav}
                >
                  <CgPlayList className="mobile-icon" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-container">
          {isClicked && this.renderNavbarView()}
        </div>
      </>
    )
  }
}

export default Header
