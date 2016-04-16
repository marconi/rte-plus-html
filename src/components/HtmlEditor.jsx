import React, {Component, PropTypes} from 'react'
import styles from '../css/editor.css'

export default class HtmlEditor extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const {value, onChange} = this.props
    return (
      <textarea
        className={styles.source}
        placeholder="Tell a story"
        value={value.toString('html')}
        onChange={onChange} />
    )
  }
}
