import {Component} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

class StateDetails extends Component {
  render() {
    const {statesData, stateDetails} = this.props
    if (statesData !== undefined) {
      const stateCode = stateDetails.state_code
      const filteredData = statesData[stateCode]
      const {meta, total} = filteredData
      const {confirmed, deceased, recovered} = total
      const active = confirmed - deceased - recovered
      return (
        <li className="state-container">
          <Link to={`/state/${stateCode}`} className="state-link-item">
            <p className="state-full-name">{stateDetails.state_name}</p>
          </Link>
          <p className="state-confirmed">{confirmed}</p>
          <p className="state-active">{active}</p>
          <p className="state-recovered">{recovered}</p>
          <p className="state-deceased">{deceased}</p>
          <p className="state-population">{meta.population}</p>
        </li>
      )
    }
    return null
  }
}

export default StateDetails
