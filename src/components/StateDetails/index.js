import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class StateDetails extends Component {
  render() {
    const {statesData} = this.props
    const {stateDetails} = this.props
    const {stateCode} = stateDetails
    const filteredData = statesData[stateCode]
    console.log(filteredData)
    const {meta, total} = filteredData
    const {population} = meta
    const {confirmed, deceased, recovered} = total
    const active = confirmed - deceased - recovered
    return (
      <li className="state-container">
        <div className="state-details-name-container">
          <Link to={`/state/${stateCode}`} className="state-link-item">
            <p className="state-full-name">{stateDetails.state_name}</p>
          </Link>
        </div>
        <div className="state-table-column">
          <p className="state-confirmed">{confirmed}</p>
        </div>
        <div className="state-table-column">
          <p className="state-active">{active}</p>
        </div>
        <div className="state-table-column">
          <p className="state-recovered">{recovered}</p>
        </div>
        <div className="state-table-column">
          <p className="state-deceased">{deceased}</p>
        </div>
        <div className="state-table-column">
          <p className="state-population">{population}</p>
        </div>
      </li>
    )
  }
}

export default StateDetails
