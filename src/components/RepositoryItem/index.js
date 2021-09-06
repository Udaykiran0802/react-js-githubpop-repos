import './index.css'

const RepositoryItem = props => {
  const {repositoryItem} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repositoryItem

  return (
    <li className="repository-card-item-container">
      <img src={avatarUrl} alt={name} className="card-item-image" />
      <h1 className="card-item-name">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} Stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open-issues"
        />
        <p className="stats-text">{issuesCount} open issuess</p>
      </div>
    </li>
  )
}
export default RepositoryItem
