import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import TestUtils from 'react-addons-test-utils'
import RichTextEditor from 'react-rte'
import Editor from '../components/Editor.jsx'
import IconButton from '../components/IconButton.jsx'
import HtmlEditor from '../components/HtmlEditor.jsx'

expect.extend(expectJSX)
describe('Editor', () => {
  it('should render editor defaults', () => {
    const editor = ReactDOM.render(<Editor />, document.createElement('div'))
    const richTextEditor = TestUtils.findRenderedComponentWithType(editor, RichTextEditor)
    expect(richTextEditor).toExist()

    const iconButtons = TestUtils.scryRenderedComponentsWithType(editor, IconButton)
    expect(iconButtons.length).toEqual(2)

    const richTextButton = TestUtils.findRenderedDOMComponentWithClass(editor, 'iconButtonRichText')
    expect(richTextButton).toExist()

    const htmlButton = TestUtils.findRenderedDOMComponentWithClass(editor, 'iconButtonHtml')
    expect(htmlButton).toExist()
  })

  it('should switch from rich text to html', () => {
    const sampleHtml = '<p>Hello <del>World!<del></p>'
    const newValue = RichTextEditor.createValueFromString(sampleHtml, 'html')
    const editor = ReactDOM.render(<Editor value={newValue} />, document.createElement('div'))

    const richTextEditor = TestUtils.findRenderedComponentWithType(editor, RichTextEditor)
    expect(richTextEditor.props.value.toString('html')).toEqual(sampleHtml)

    const htmlButton = TestUtils.findRenderedDOMComponentWithClass(editor, 'iconButtonHtml')
    TestUtils.Simulate.click(htmlButton)

    const htmlEditor = TestUtils.findRenderedComponentWithType(editor, HtmlEditor)
    expect(htmlEditor).toExist()

    const textarea = TestUtils.findRenderedDOMComponentWithClass(htmlEditor, 'source')
    expect(textarea).toExist()
    expect(textarea.value).toEqual(sampleHtml)
  })

  it('should switch from html to rich text', () => {
    const editor = ReactDOM.render(<Editor />, document.createElement('div'))
    const richTextButton = TestUtils.findRenderedDOMComponentWithClass(editor, 'iconButtonRichText')
    const htmlButton = TestUtils.findRenderedDOMComponentWithClass(editor, 'iconButtonHtml')

    // there should be rich text but not html editor
    let richTextEditor = TestUtils.findRenderedComponentWithType(editor, RichTextEditor)
    expect(richTextEditor).toExist()
    expect(() => {
      TestUtils.findRenderedComponentWithType(editor, HtmlEditor)
    }).toThrow(/Did not find/)

    // switch to html
    TestUtils.Simulate.click(htmlButton)

    // now there should be no rich text but with html editor
    expect(() => {
      TestUtils.findRenderedComponentWithType(editor, RichTextEditor)
    }).toThrow(/Did not find/)
    let htmlEditor = TestUtils.findRenderedComponentWithType(editor, HtmlEditor)
    expect(htmlEditor).toExist()

    // switch back to rich text
    TestUtils.Simulate.click(richTextButton)

    // rich text should be back and html editor should be gone again
    richTextEditor = TestUtils.findRenderedComponentWithType(editor, RichTextEditor)
    expect(richTextEditor).toExist()

    expect(() => {
      TestUtils.findRenderedComponentWithType(editor, HtmlEditor)
    }).toThrow(/Did not find/)
  })
})
