import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'
import IconButton from '../components/IconButton.jsx'

describe('<IconButton />', () => {

  const onClick = () => console.log('clicked')

  it('should render rich text button', () => {
    const wrapper = shallow(<IconButton
                              label="Rich Text"
                              icon="RichText"
                              isActive={true}
                              onClick={onClick} />)
    expect(wrapper.props().title).toEqual('Rich Text')
    expect(wrapper.props().className).toEqual('iconButton active iconButtonRichText')
    expect(wrapper.props().onClick).toExist()
    expect(wrapper.find('span').props().className).toEqual('icon iconRichText')
  })

  it('should render html button', () => {
    const wrapper = shallow(<IconButton
                              label="Html"
                              icon="Html"
                              isActive={false}
                              onClick={onClick} />)
    expect(wrapper.props().title).toEqual('Html')
    expect(wrapper.props().className).toEqual('iconButton iconButtonHtml')
    expect(wrapper.props().onClick).toExist()
    expect(wrapper.find('span').props().className).toEqual('icon iconHtml')
  })
})
