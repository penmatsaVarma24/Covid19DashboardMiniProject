import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import Footer from '../Footer'
import StateDetails from '../StateDetails'

import './index.css'

const initialStatesList = [
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
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.inprogress,
    statesList: initialStatesList,
  }

  componentDidMount() {
    this.renderCovid19Api()
  }

  renderCovid19Api = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({statesData: data, apiStatus: apiStatusConstants.success})
    }
  }

  renderStateDetailsView = () => {
    const {statesData, statesList} = this.state

    const ascendingSort = () => {
      this.setState(prevState => ({
        statesList: [...prevState.statesList].sort((a, b) =>
          a.state_name.localeCompare(b.state_name),
        ),
      }))
    }

    const descendingSort = () => {
      this.setState(prevState => ({
        statesList: [...prevState.statesList].sort((a, b) =>
          b.state_name.localeCompare(a.state_name),
        ),
      }))
    }
    return (
      <div className='state-details-container' testid='stateWiseCovidDataTable'>
        <div className='state-details-heading'>
          <div className='states-name-heading-container'>
            <p className='states-name-heading'>States/UT</p>
            <div className='icons-container'>
              <button
                type='button'
                className='sorting-icon'
                testid='ascendingSort'
                onClick={ascendingSort}
              >
                <FcGenericSortingAsc size='20' />
              </button>
              <button
                type='button'
                className='sorting-icon'
                testid='descendingSort'
                onClick={descendingSort}
              >
                <FcGenericSortingDesc size='20' />
              </button>
            </div>
          </div>
          <div className='table-column-container'>
            <p className='states-confirmed-heading'>Confirmed</p>
          </div>
          <div className='table-column-container'>
            <p className='states-active-heading'>Active</p>
          </div>
          <div className='table-column-container'>
            <p className='states-recovered-heading'>Recovered</p>
          </div>
          <div className='table-column-container'>
            <p className='states-deceased-heading'>Deceased</p>
          </div>
          <div className='table-column-container'>
            <p className='states-population-heading'>Population</p>
          </div>
        </div>
        <hr className='line' />
        <ul className='states-detailed-container'>
          {statesList.map(state => (
            <StateDetails
              key={state.stateCode}
              stateDetails={state}
              statesData={statesData}
            />
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
        <div className='home-main-container'>
          <div className='search-container'>
            <BsSearch className='search-icon' />
            <input
              type='search'
              placeholder='Enter the State'
              value={searchInput}
              onChange={onChangeSearch}
              className='search-item'
            />
          </div>
          <li>{searchInput.length > 0 && this.renderSearchList()}</li>
          <li>{this.renderCardsContainer()}</li>
          <li>{this.renderStateDetailsView()}</li>
        </div>
        <Footer />
      </>
    )
  }

  renderLoaderView = () => (
    <div className='loader-container' testid='homeRouteLoader'>
      <Loader type='TailSpin' color='#007bff' width={80} height={80} />
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
    const filteredStates = initialStatesList.filter(state =>
      state.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <ul className='states-list-container' testid='searchResultsUnorderedList'>
        {filteredStates.map(state => (
          <li className='state-list-item' key={state.stateCode}>
            <Link to={`/state/${state.stateCode}`} className='states-link-item'>
              <p className='state-name'>{state.state_name}</p>
            </Link>
            <button type='button' className='state-list'>
              <p className='state-code'>{state.stateCode}</p>
              <BiChevronRightSquare className='arrow-icon' />
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

    initialStatesList.forEach(eachState => {
      if (statesData[eachState.stateCode]) {
        const {total} = statesData[eachState.stateCode]
        confirmedCases += total.confirmed ? total.confirmed : 0
        recoveredCases += total.recovered ? total.recovered : 0
        deceasedCases += total.deceased ? total.deceased : 0
      }
    })

    activeCases += confirmedCases - (recoveredCases + deceasedCases)

    return (
      <div className='cards-container'>
        <div className='confirmed-card' testid='countryWideConfirmedCases'>
          <p className='confirmed-heading'>Confirmed</p>
          <img
            src='https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/check-mark_1_nioget.png'
            alt='country wide confirmed cases pic'
            className='confirmed-icon'
          />
          <p className='confirmed-count'>{confirmedCases}</p>
        </div>
        <div className='active-card' testid='countryWideActiveCases'>
          <p className='active-heading'>Active</p>
          <img
            src='https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047058/protection_1_vmyldi.png'
            alt='country wide active cases pic'
            className='active-icon'
          />
          <p className='active-count'>{activeCases}</p>
        </div>
        <div className='recovered-card' testid='countryWideRecoveredCases'>
          <p className='recovered-heading'>Recovered</p>
          <img
            src='https://res.cloudinary.com/dt4si2qdg/image/upload/v1738046946/recovered_1_wtxghq.png'
            alt='country wide recovered cases pic'
            className='recovered-icon'
          />
          <p className='recovered-count'>{recoveredCases}</p>
        </div>
        <div className='deceased-card' testid='countryWideDeceasedCases'>
          <p className='deceased-heading'>Deceased</p>
          <img
            src='https://res.cloudinary.com/dt4si2qdg/image/upload/v1738047057/breathing_1_g7n6fz.png'
            alt='country wide deceased cases pic'
            className='deceased-icon'
          />
          <p className='deceased-count'>{deceasedCases}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='home-container'>
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default Home
