import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  HomeSection,
  Ul,
  SelectSection,
  Select,
  Option,
} from './styledComponents'
import ProjectItems from '../ProjectItems'
import Navbar from '../Navbar'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    projectsList: [],
    apiStatus: apiStatusConstants.initial,
    selectOption: categoriesList[0].id,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {selectOption} = this.state
    const url = ` https://apis.ccbp.in/ps/projects?category=${selectOption}`
    // const url = `https://example.com/api/projects`

    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        projectsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleOnChange = event => {
    this.setState({selectOption: event.target.value}, this.getProjects)
  }

  handleRetry = () => {
    this.getProjects()
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.handleRetry} className="btn">
        Retry
      </button>
    </div>
  )

  renderProjectsListView = () => {
    const {projectsList} = this.state
    return (
      <>
        <Ul>
          {projectsList.map(each => (
            <ProjectItems projectDetails={each} key={each.id} />
          ))}
        </Ul>
      </>
    )
  }

  renderAllProjects = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderCategoriesListView = () => {
    const {selectOption} = this.state

    return (
      <>
        <SelectSection>
          <Select onChange={this.handleOnChange} value={selectOption}>
            {categoriesList.map(category => (
              <Option key={category.id} value={category.id}>
                {category.displayText}
              </Option>
            ))}
          </Select>
        </SelectSection>
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar />

        <HomeSection>
          {this.renderCategoriesListView()}
          {this.renderAllProjects()}
        </HomeSection>
      </>
    )
  }
}

export default Home
