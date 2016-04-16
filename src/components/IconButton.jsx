import React, {Component, PropTypes} from 'react'
import cx from 'classnames'
import styles from '../css/buttons.css'

export default class IconButton extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const {label, icon, isActive, onClick} = this.props
    const activeClass = (isActive) ? ' active' : ''

    const buttonClasses = cx({
      [styles.iconButton]: true,
      [styles.active]: isActive,
      [styles[`iconButton${icon}`]]: true
    })

    const iconClasses = cx({
      [styles.icon]: true,
      [styles[`icon${icon}`]]: true
    })

    return (
      <button
        title={label}
        className={buttonClasses}
        onClick={onClick}>
        <span className={iconClasses} />
      </button>
    )
  }
}
