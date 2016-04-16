import React, {Component} from 'react'
import autobind from 'class-autobind'
import RichTextEditor from 'react-rte'
import HtmlEditor from './HtmlEditor.jsx'
import IconButton from './IconButton.jsx'
import styles from '../css/editor.css'

export default class Editor extends Component {
  static propTypes: {
    value: PropTypes.object
  }

  constructor(props) {
    super(props)
    autobind(this)
    this.state = {
      value: this.props.value || RichTextEditor.createEmptyValue(),
      showing: 'richtext'
    }
  }

  render() {
    let {value, showing} = this.state
    return (
      <div>
        <div className="row">
          <table>
            <tbody>
              <tr>
                <td className={styles.editorWrapper}>
                  {showing === 'richtext' ?
                    <RichTextEditor
                      value={value}
                      onChange={(value) => this.setState({value})}
                      placeholder="Tell a story" /> :
                    <HtmlEditor
                      value={value}
                      onChange={this.onChangeSource} />
                  }
                </td>
                <td className={styles.switchWrapper}>
                  <div className={styles.switch}>
                    <IconButton
                      label="Rich Text"
                      icon="RichText"
                      isActive={showing === 'richtext'}
                      onClick={() => this.setState({showing: 'richtext'})} />
                    <IconButton
                      label="HTML"
                      icon="Html"
                      isActive={showing === 'html'}
                      onClick={() => this.setState({showing: 'html'})} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  onChangeSource(event) {
    let source = event.target.value
    let oldValue = this.state.value
    this.setState({
      value: oldValue.setContentFromString(source, 'html'),
    })
  }
}
