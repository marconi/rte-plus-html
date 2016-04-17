import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'
import RichTextEditor from 'react-rte'
import Editor from '../components/Editor.jsx'
import IconButton from '../components/IconButton.jsx'
import HtmlEditor from '../components/HtmlEditor.jsx'

describe('<Editor />', () => {
  it('should render editor defaults', () => {
    const wrapper = mount(<Editor />)
    const richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()

    const richTextButton = wrapper.find('.iconButtonRichText').first()
    expect(richTextButton.get(0)).toExist()

    const htmlButton = wrapper.find('.iconButtonHtml').first()
    expect(htmlButton.get(0)).toExist()
  })

  it('should switch from rich text to html', () => {
    const html = '<p>Hello <del>World!<del></p>'
    const newValue = RichTextEditor.createValueFromString(html, 'html')
    const wrapper = mount(<Editor value={newValue} />)

    const richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()
    expect(richTextEditor.props().value.toString('html')).toEqual(html)

    const htmlButton = wrapper.find('.iconButtonHtml').first()
    htmlButton.simulate('click')

    const htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toExist()

    const textarea = wrapper.find('textarea').first()
    expect(textarea.get(0)).toExist()
    expect(textarea.text()).toEqual(html)
  })

  it('should switch from html to rich text', () => {
    const wrapper = mount(<Editor />)
    const richTextButton = wrapper.find('.iconButtonRichText').first()
    const htmlButton = wrapper.find('.iconButtonHtml').first()

    let richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()

    let htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toNotExist()

    expect(wrapper.state().showing).toEqual('richtext')
    htmlButton.simulate('click') // switch to html
    expect(wrapper.state().showing).toEqual('html')

    richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toNotExist()

    htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toExist()

    richTextButton.simulate('click') // switch back to rich text
    expect(wrapper.state().showing).toEqual('richtext')

    richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()

    htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toNotExist()
  })
})
