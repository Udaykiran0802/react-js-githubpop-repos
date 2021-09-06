import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterItem, onChangeFilterData, isActive} = props
  const {id, language} = languageFilterItem

  const buttonClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickButton = () => {
    onChangeFilterData(id)
  }

  return (
    <li className="list-container">
      <button type="button" className={buttonClassName} onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
