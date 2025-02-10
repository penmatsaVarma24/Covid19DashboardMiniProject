import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts'

const apiStatusConstants = {
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Charts extends Component {
  state = {
    barGraphData: '',
    topTenData: [],
    apiStatus: apiStatusConstants.inprogress,
  }

  componentDidMount() {
    this.renderChartsDataApi()
  }

  renderChartsDataApi = async () => {
    const {stateCode} = this.props
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const dataDateWise = Object.keys(data[stateCode].dates)
    const particularState = dataDateWise.map(date => ({
      date,
      confirmed: data[stateCode].dates[date].total.confirmed,
      deceased: data[stateCode].dates[date].total.deceased,
      recovered: data[stateCode].dates[date].total.recovered,
      tested: data[stateCode].dates[date].total.tested,
      active:
        data[stateCode].dates[date].total.confirmed -
        (data[stateCode].dates[date].total.deceased +
          data[stateCode].dates[date].total.recovered),
    }))

    const particularStateForOtherChart = dataDateWise.map(date => ({
      date,
      confirmed: data[stateCode].dates[date].total.confirmed,
      deceased: data[stateCode].dates[date].total.deceased,
      recovered: data[stateCode].dates[date].total.recovered,
      tested: data[stateCode].dates[date].total.tested,
      active:
        data[stateCode].dates[date].total.confirmed -
        (data[stateCode].dates[date].total.deceased +
          data[stateCode].dates[date].total.recovered),
    }))

    const revisedData = particularState.slice(
      particularState.length - 10,
      particularState.length,
    )
    if (response.ok) {
      this.setState({
        barGraphData: particularStateForOtherChart,
        topTenData: revisedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderBarGraphs = () => {
    const {topTenData} = this.state
    if (topTenData.length !== 0) {
      const {category} = this.props
      const barChartType = category.toLowerCase()
      let colortype = '#9A0E31'
      if (barChartType === 'confirmed') {
        colortype = '#9A0E31'
      } else if (barChartType === 'active') {
        colortype = '#0A4FA0'
      } else if (barChartType === 'recovered') {
        colortype = '#216837'
      } else if (barChartType === 'deceased') {
        colortype = '#474C57'
      }
      return (
        <div className="chart-wrapper">
          <BarChart width={800} height={500} data={topTenData} barSize={45}>
            <XAxis
              dataKey="date"
              stroke={`${colortype}`}
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              dy={10}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={`${barChartType}`}
              fill={`${colortype}`}
              label={{position: 'top', fill: '#fff'}}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </div>
      )
    }
    return null
  }

  graph = (type, color) => {
    const {barGraphData} = this.state
    if (barGraphData.length !== 0) {
      return (
        <div className="desktop-graph">
          <LineChart
            width={800}
            height={250}
            data={barGraphData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis
              dataKey="date"
              style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
              dy={10}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={type} stroke={color} />
          </LineChart>
        </div>
      )
    }
    return null
  }

  renderallChartsView = () => (
    <>
      <div className="barchart-container">{this.renderBarGraphs()}</div>

      <h1 className="charts-title">Daily Spread Trends</h1>
      <div testid="lineChartsContainer" className="barcharts-container">
        <div className="charts confirmed-background">
          {this.graph('confirmed', '#FF073A')}
        </div>
        <div className="charts active-background">
          {this.graph('active', '#007BFF')}
        </div>
        <div className="charts recovered-background">
          {this.graph('recovered', '#27A243')}
        </div>
        <div className="charts deceased-background">
          {this.graph('deceased', '#6C757D')}
        </div>
        <div className="charts tested-background">
          {this.graph('tested', '#9673B9')}
        </div>
      </div>
    </>
  )

  renderSuccessView = () => <>{this.renderallChartsView()}</>

  renderLoaderView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
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

  render() {
    return <div>{this.renderContent()}</div>
  }
}

export default Charts
