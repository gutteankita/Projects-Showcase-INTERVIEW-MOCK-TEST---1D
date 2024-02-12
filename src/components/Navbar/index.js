import {Component} from 'react'
import {NavbarSection, Img} from './styledComponents'

class Navbar extends Component {
  render() {
    return (
      <NavbarSection>
        <Img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />
      </NavbarSection>
    )
  }
}

export default Navbar
