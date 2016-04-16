import React from 'react'
import expect from 'expect'
import expectJSX from 'expect-jsx'
import TestUtils from 'react-addons-test-utils'
import IconButton from '../components/IconButton.jsx'

expect.extend(expectJSX)
describe('IconButton', () => {

  const onClick = () => console.log('clicked')

  it('should render rich text button', () => {
    const iconButton = <IconButton
                        label="Rich Text"
                        icon="RichText"
                        isActive={true}
                        onClick={onClick} />
    const renderer = TestUtils.createRenderer()
    renderer.render(iconButton)
    const actual = renderer.getRenderOutput()
    const expected = (
      <button
        title="Rich Text"
        className="iconButton active iconButtonRichText"
        onClick={onClick}>
        <span className="icon iconRichText" />
      </button>
    )
    expect(actual).toIncludeJSX(expected)
  })

  it('should render html button', () => {
    const iconButton = <IconButton
                        label="Html"
                        icon="Html"
                        isActive={true}
                        onClick={onClick} />
    const renderer = TestUtils.createRenderer()
    renderer.render(iconButton)
    const actual = renderer.getRenderOutput()
    const expected = (
      <button
        title="Html"
        className="iconButton active iconButtonHtml"
        onClick={onClick}>
        <span className="icon iconHtml" />
      </button>
    )
    expect(actual).toIncludeJSX(expected)
  })
})
