import React from 'react'
import setOrientation from './setOrientation'
import {loadImage} from '../utils'


export default class ImageStat extends React.Component {
  _image = null
  state = {
    orientation: 'square',
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
    complete: false
  }

  constructor (props) {
    super(props)
    this.statContext = {imageRef: this.imageRef}
  }

  imageRef = e => {
    if (e !== this._image || (e && this._image && e.src !== this._image.src)) {
      this._image = e
      this.setStats()
    }
  }

  setStats () {
    if (this._image !== null) {
      loadImage(this._image).then(
        ({target}) => {
          const {width, height, naturalWidth, naturalHeight} = target

          this.setState({
            ...setOrientation({width: naturalWidth, height: naturalHeight}),
            width,
            height,
            naturalWidth,
            naturalHeight,
            complete: true
          })
        }
      )
    }
  }

  render () {
    return this.props.children(Object.assign(this.statContext, this.state))
  }
}
