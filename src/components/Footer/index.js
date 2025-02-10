import {FiInstagram} from 'react-icons/fi'

import {VscGithubAlt} from 'react-icons/vsc'

import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-heading-container">
      <p className="footer-heading">
        COVID19<span className="footer-span-item">INDIA</span>
      </p>
    </div>
    <div className="footer-description-container">
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
    </div>
    <div className="footer-icons-container">
      <VscGithubAlt className="git-logo" />
      <FiInstagram className="insta-logo" />
      <FaTwitter className="twitter-logo" />
    </div>
  </div>
)

export default Footer
