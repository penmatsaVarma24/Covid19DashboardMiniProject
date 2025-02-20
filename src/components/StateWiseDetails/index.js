import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Footer from '../Footer'
import Charts from '../Charts'

import './index.css'

const statesList = [
  {
    stateCode: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    stateCode: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    stateCode: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    stateCode: 'AS',
    state_name: 'Assam',
  },
  {
    stateCode: 'BR',
    state_name: 'Bihar',
  },
  {
    stateCode: 'CH',
    state_name: 'Chandigarh',
  },
  {
    stateCode: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    stateCode: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    stateCode: 'DL',
    state_name: 'Delhi',
  },
  {
    stateCode: 'GA',
    state_name: 'Goa',
  },
  {
    stateCode: 'GJ',
    state_name: 'Gujarat',
  },
  {
    stateCode: 'HR',
    state_name: 'Haryana',
  },
  {
    stateCode: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    stateCode: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    stateCode: 'JH',
    state_name: 'Jharkhand',
  },
  {
    stateCode: 'KA',
    state_name: 'Karnataka',
  },
  {
    stateCode: 'KL',
    state_name: 'Kerala',
  },
  {
    stateCode: 'LA',
    state_name: 'Ladakh',
  },
  {
    stateCode: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    stateCode: 'MH',
    state_name: 'Maharashtra',
  },
  {
    stateCode: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    stateCode: 'MN',
    state_name: 'Manipur',
  },
  {
    stateCode: 'ML',
    state_name: 'Meghalaya',
  },
  {
    stateCode: 'MZ',
    state_name: 'Mizoram',
  },
  {
    stateCode: 'NL',
    state_name: 'Nagaland',
  },
  {
    stateCode: 'OR',
    state_name: 'Odisha',
  },
  {
    stateCode: 'PY',
    state_name: 'Puducherry',
  },
  {
    stateCode: 'PB',
    state_name: 'Punjab',
  },
  {
    stateCode: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    stateCode: 'SK',
    state_name: 'Sikkim',
  },
  {
    stateCode: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    stateCode: 'TG',
    state_name: 'Telangana',
  },
  {
    stateCode: 'TR',
    state_name: 'Tripura',
  },
  {
    stateCode: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    stateCode: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    stateCode: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class StateWiseDetails extends Component {
  state = {
    stateData: [],
    apiStatus: apiStatusConstants.inprogress,
    category: 'Confirmed',
    sortedData: [],
  }

  componentDidMount() {
    this.renderStateApi()
  }

  onClickConfirmedTab = () => {
    this.setState({category: 'Confirmed'}, this.renderDescendingOrder)
  }

  onClickActiveTab = () => {
    this.setState({category: 'Active'}, this.renderDescendingOrder)
  }

  onClickRecoveredTab = () => {
    this.setState({category: 'Recovered'}, this.renderDescendingOrder)
  }

  onClickDeceasedTab = () => {
    this.setState({category: 'Deceased'}, this.renderDescendingOrder)
  }

  renderDescendingOrder = () => {
    const {category, stateData} = this.state
    const districtOutput = stateData.districts
    const distNamesList = Object.keys(districtOutput)
    const categoryLower = category.toLowerCase()

    const categoryData = distNamesList.map(district => ({
      distName: district,
      value: districtOutput[district].total[categoryLower] || 0,
    }))

    const activeCases = distNamesList.map(element => ({
      distName: element,
      value:
        districtOutput[element].total.confirmed -
          (districtOutput[element].total.recovered +
            districtOutput[element].total.deceased) || 0,
    }))
    activeCases.sort((a, b) => b.value - a.value)

    if (categoryLower === 'active') {
      return this.setState({sortedData: activeCases})
    }

    const sortedData = categoryData.sort((a, b) => b.value - a.value)
    return this.setState({sortedData})
  }

  renderStateApi = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const stateData = data[stateCode]
      this.setState(
        {
          stateData,
          apiStatus: apiStatusConstants.success,
        },
        this.renderDescendingOrder,
      )
    }
  }

  renderSuccessView = () => (
    <div className="state-wise-container">
      {this.renderStateNameContainerView()}
      {this.renderCardsContainer()}
      {this.renderDistrictWiseView()}
      {this.renderGraphsView()}
      <Footer />
    </div>
  )

  renderStateNameContainerView = () => {
    const {stateData} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const particularState = statesList.find(
      state => state.stateCode === stateCode,
    )
    const {meta, total} = stateData
    const newFormat = new Date(meta.last_updated)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Novomber',
      'December',
    ]
    const month = months[newFormat.getMonth()]
    const date = newFormat.getDate()
    const year = newFormat.getFullYear()
    let sub
    if (date === 1) {
      sub = 'st'
    } else if (date === 2) {
      sub = 'nd'
    } else if (date === 3) {
      sub = 'rd'
    } else {
      sub = 'th'
    }
    return (
      <div className="state-name-tested-container">
        <div className="state-name-container">
          <h1 className="state-wise-name">{particularState.state_name}</h1>
          <p className="last-updated">
            Last updated on {month} {date}
            {sub} {year}.
          </p>
        </div>
        <div className="tested-container">
          <p className="tested-para">Tested</p>
          <p className="tested-count">{total.tested}</p>
        </div>
      </div>
    )
  }

  renderCardsContainer = () => {
    const {stateData} = this.state
    const {total} = stateData
    const activeCases = total.confirmed - (total.recovered + total.deceased)

    return (
      <div className="state-cards-container">
        <div
          className="state-confirmed-card"
          testid="stateSpecificConfirmedCasesContainer"
          onClick={this.onClickConfirmedTab}
          role="button"
          tabIndex={0}
        >
          <p className="state-confirmed-heading">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/check-mark_1_nioget.png"
            alt="state specific confirmed cases pic"
            className="state-confirmed-icon"
          />
          <p className="state-confirmed-count">{total.confirmed}</p>
        </div>
        <div
          className="state-active-card"
          testid="stateSpecificActiveCasesContainer"
          onClick={this.onClickActiveTab}
          role="button"
          tabIndex={0}
        >
          <p className="state-active-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047058/protection_1_vmyldi.png"
            alt="state specific active cases pic"
            className="state-active-icon"
          />
          <p className="state-active-count">{activeCases}</p>
        </div>
        <div
          className="state-recovered-card"
          testid="stateSpecificRecoveredCasesContainer"
          onClick={this.onClickRecoveredTab}
          role="button"
          tabIndex={0}
        >
          <p className="state-recovered-heading">Recovered</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738046946/recovered_1_wtxghq.png"
            alt="state specific recovered cases pic"
            className="state-recovered-icon"
          />
          <p className="state-recovered-count">{total.recovered}</p>
        </div>
        <div
          className="state-deceased-card"
          testid="stateSpecificDeceasedCasesContainer"
          onClick={this.onClickDeceasedTab}
          role="button"
          tabIndex={0}
        >
          <p className="state-deceased-heading">Deceased</p>
          <img
            src="https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/breathing_1_g7n6fz.png"
            alt="state specific deceased cases pic"
            className="state-deceased-icon"
          />
          <p className="state-deceased-count">{total.deceased}</p>
        </div>
      </div>
    )
  }

  renderDistrictWiseView = () => {
    const {sortedData} = this.state
    return (
      <div className="districts-container">
        <h1 className="districts-heading">Top Districts</h1>
        <ul
          className="districts-list-container"
          testid="topDistrictsUnorderedList"
        >
          {sortedData.map(item => (
            <li className="district-list-item" key={item.distName}>
              <div className="district-count-container">
                <p className="district-cases">{item.value}</p>
              </div>
              <div className="district-name-container">
                <p className="district-name">{item.distName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#007bff" width={80} height={80} />
    </div>
  )

  renderGraphsView = () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {category} = this.state
    return (
      <div className="charts-container">
        <Charts stateCode={stateCode} category={category} />
      </div>
    )
  }

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

  render() {
    return (
      <div className="state-wise-main-container" testid="lineChartsContainer">
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default StateWiseDetails
