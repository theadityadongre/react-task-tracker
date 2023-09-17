import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Button from './Button'

const Header = ({title, toggleAdd, addButtonChangeText}) => {
  const location = useLocation();
  return (
    <header className="header">
        <h1>{title}</h1>
        {location.pathname === "/" && <Button color={addButtonChangeText ? "red" : "green"} 
        text={addButtonChangeText ? "Close" : "Add"} 
        onClick={toggleAdd}/>}
    </header>
  )
}

Header.defaultProps = {
    title: "Task Tracker"
  }

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in js 
// const headingStyle = {
//     color: "cyan", 
//     backgroundColor : "Black"
// }

export default Header 