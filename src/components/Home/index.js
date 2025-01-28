import {Component} from 'react'

import {FaSearch, FaChevronRight} from 'react-icons/fa'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Footer from '../Footer'
import StateDetails from '../StateDetails'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {searchInput: '', apiStatus: apiStatusConstants.inprogress}

  componentDidMount() {
    this.renderCovid19Api()
  }

  renderCovid19Api = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      this.setState({statesData: data, apiStatus: apiStatusConstants.success})
    }
  }

  renderStateDetailsView = () => {
    const {statesData} = this.state
    return (
      <div className="state-details-container">
        <div className="state-details-heading">
          <p className="state-name-heading">States/UT</p>
          <p className="state-confirmed-heading">Confirmed</p>
          <p className="state-active-heading">Active</p>
          <p className="state-recovered-heading">Recovered</p>
          <p className="state-deceased-heading">Deceased</p>
          <p className="state-population-heading">Population</p>
        </div>
        <ul className="states-Detailed-container">
          {statesList.map(state => (
            <StateDetails stateDetails={state} statesData={statesData} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const onChangeSearch = event => {
      this.setState({searchInput: event.target.value})
    }
    const {searchInput} = this.state
    return (
      <>
        <div className="home-main-container">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Enter the State"
              value={searchInput}
              onChange={onChangeSearch}
              className="search-item"
            />
          </div>
          {searchInput.length > 0 && this.renderSearchList()}
          {this.renderCardsContainer()}
          {this.renderStateDetailsView()}
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

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  renderSearchList = () => {
    const {searchInput} = this.state
    const filteredStates = statesList.filter(state =>
      state.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className="states-list-container">
        {filteredStates.map(state => (
          <li className="state-list-item" key={state.state_code}>
            <p className="state-name">{state.state_name}</p>
            <button type="button" className="state-list">
              <p className="state-code">{state.state_code}</p>
              <p className="icon-container">
                <FaChevronRight className="arrow-icon" />
              </p>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderCardsContainer = () => {
    const {statesData} = this.state
    let activeCases = 0
    let recoveredCases = 0
    let deceasedCases = 0
    let confirmedCases = 0

    statesList.forEach(eachState => {
      if (statesData[eachState.state_code]) {
        const {total} = statesData[eachState.state_code]
        confirmedCases += total.confirmed ? total.confirmed : 0
        recoveredCases += total.recovered ? total.recovered : 0
        deceasedCases += total.deceased ? total.deceased : 0
      }
    })

    activeCases += confirmedCases - (recoveredCases + deceasedCases)

    return (
      <div className="cards-container">
        <div className="confirmed-card">
          <p className="confirmed-heading">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/check-mark_1_nioget.png"
            className="recovered-icon"
          />
          <p className="confirmed-count">{confirmedCases}</p>
        </div>
        <div className="active-card">
          <p className="active-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047058/protection_1_vmyldi.png"
            className="recovered-icon"
          />
          <p className="active-count">{activeCases}</p>
        </div>
        <div className="recovered-card">
          <p className="recovered-heading">Recovered</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738046946/recovered_1_wtxghq.png"
            className="recovered-icon"
          />
          <p className="recovered-count">{recoveredCases}</p>
        </div>
        <div className="deceased-card">
          <p className="deceased-heading">Deceased</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/breathing_1_g7n6fz.png"
            className="deceased-icon"
          />
          <p className="deceased-count">{deceasedCases}</p>
        </div>
      </div>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="home-container">
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default Home
