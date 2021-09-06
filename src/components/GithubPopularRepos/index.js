import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const githubConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryItemList: [],
    activeFilterData: languageFiltersData[0].id,
    gitHubStatus: githubConstants.initial,
  }

  componentDidMount = () => {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({gitHubStatus: githubConstants.loading})
    const {activeFilterData} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterData}`
    const response = await fetch(url)
    // console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      const updatedItem = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
      }))
      this.setState({
        repositoryItemList: updatedItem,
        gitHubStatus: githubConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        gitHubStatus: githubConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {repositoryItemList} = this.state
    return (
      <ul className="repositories-cards-list-container">
        {repositoryItemList.map(each => (
          <RepositoryItem key={each.id} repositoryItem={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        className="error-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onChangeFilterData = activeFilterData => {
    this.setState({activeFilterData}, this.getRepositoryItems)
  }

  renderPopularRepos = () => {
    const {gitHubStatus} = this.state
    switch (gitHubStatus) {
      case githubConstants.success:
        return this.renderSuccessView()
      case githubConstants.failure:
        return this.renderFailureView()
      case githubConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeFilterData} = this.state
    return (
      <div className="app-container">
        <div className="git-hub-repos-container">
          <h1 className="git-hub-heading">Popular</h1>
          <ul className="language-filter-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                key={eachItem.id}
                languageFilterItem={eachItem}
                onChangeFilterData={this.onChangeFilterData}
                isActive={eachItem.id === activeFilterData}
              />
            ))}
          </ul>
          {this.renderPopularRepos()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
