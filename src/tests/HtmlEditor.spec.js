import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'
import HtmlEditor from '../components/HtmlEditor.jsx'

describe('<HtmlEditor />', () => {

  const onChange = () => console.log('changing')

  it('should render html editor', () => {
    const html = '<p>Hello</p>'
    const value = {toString: (format) => html}
    const wrapper = shallow(<HtmlEditor
                              value={value}
                              onChange={onChange} />)
    expect(wrapper.type()).toEqual('textarea')
    expect(wrapper.props().className).toEqual('source')
    expect(wrapper.props().value).toBe(html)
    expect(wrapper.props().onChange).toExist()
  })
})
