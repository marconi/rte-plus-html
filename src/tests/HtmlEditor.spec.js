import React from 'react'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import TestUtils from 'react-addons-test-utils'
import HtmlEditor from '../components/HtmlEditor.jsx'

expect.extend(expectJSX)
describe('HtmlEditor', () => {

  const onChange = () => console.log('changing')

  it('should render html editor', () => {
    const value = {toString: (format) => '<p>Hello</p>'}
    const htmlEditor = <HtmlEditor
                        value={value}
                        onChange={onChange} />
    const renderer = TestUtils.createRenderer()
    renderer.render(htmlEditor)
    const actual = renderer.getRenderOutput()
    const expected = (
      <textarea
        className="source"
        placeholder="Tell a story"
        value="<p>Hello</p>"
        onChange={onChange} />
    )
    expect(actual).toIncludeJSX(expected)
  })
})
