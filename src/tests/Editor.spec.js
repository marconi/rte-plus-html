import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'
import RichTextEditor from 'react-rte'
import Editor from '../components/Editor.jsx'
import IconButton from '../components/IconButton.jsx'
import HtmlEditor from '../components/HtmlEditor.jsx'

describe('<Editor />', () => {

  const wrapper = mount(<Editor />)
  const richTextButton = wrapper.find('.iconButtonRichText').first()
  const htmlButton = wrapper.find('.iconButtonHtml').first()

  it('should render editor defaults', () => {
    const richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()
    expect(richTextButton.get(0)).toExist()
    expect(htmlButton.get(0)).toExist()
  })

  it('should switch from rich text to html', () => {
    const html = '<p>Hello <del>World!<del></p>'
    const newValue = RichTextEditor.createValueFromString(html, 'html')
    wrapper.setState({value: newValue})

    const richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()
    expect(richTextEditor.props().value.toString('html')).toEqual(html)

    expect(wrapper.state().showing).toEqual('richtext')
    htmlButton.simulate('click')
    expect(wrapper.state().showing).toEqual('html')

    const htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toExist()

    const textarea = wrapper.find('textarea').first()
    expect(textarea.get(0)).toExist()
    expect(textarea.text()).toEqual(html)
  })

  it('should switch from html to rich text', () => {
    let richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toNotExist()

    let htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toExist()

    expect(wrapper.state().showing).toEqual('html')
    richTextButton.simulate('click')
    expect(wrapper.state().showing).toEqual('richtext')

    richTextEditor = wrapper.find(RichTextEditor).first()
    expect(richTextEditor.get(0)).toExist()

    htmlEditor = wrapper.find(HtmlEditor).first()
    expect(htmlEditor.get(0)).toNotExist()
  })
})
