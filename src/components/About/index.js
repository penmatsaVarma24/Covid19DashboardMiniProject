import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Footer from '../Footer'
import FaqItem from '../FaqItem'

import './index.css'

const apiStatusConstants = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {apiStatus: apiStatusConstants.inprogress, faqsList: []}

  componentDidMount() {
    this.renderAboutApi()
  }

  renderFaqsSuccessView = () => {
    const {faqsList} = this.state
    return (
      <>
        <div className="about-main-container">
          <h1 className="about-heading">About</h1>
          <p className="about-last-updated">
            Last update on January 28th 2025.
          </p>
          <p className="about-description">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul className="faqs-list-container">
            {faqsList.map(faq => (
              <FaqItem faqDetails={faq} />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#007bff" width={80} height={80} />
    </div>
  )

  renderAboutApi = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedFaqsData = data.faq
      this.setState({
        faqsList: updatedFaqsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.inprogress})
    }
  }

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFaqsSuccessView()
      case apiStatusConstants.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-container">
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default About
