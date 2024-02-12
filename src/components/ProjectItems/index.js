import {Component} from 'react'
import {Para, Img, Li} from './styledComponents'

class ProjectItems extends Component {
  render() {
    const {projectDetails} = this.props
    const {id, imageUrl, name} = projectDetails
    return (
      <Li key={id}>
        <Img src={imageUrl} alt={name} />
        <Para>{name}</Para>
      </Li>
    )
  }
}

export default ProjectItems
