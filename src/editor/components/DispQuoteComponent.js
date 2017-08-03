import { Component, TextPropertyEditor } from 'substance'

export default class DispQuote extends Component {

  render($$) {
    const node = this.props.node
    let quoteContent = node.find('disp-quote-content')
    let attribContent = node.find('attrib')

    let el = $$('blockquote')
      .addClass('sc-disp-quote')
      .attr('data-id', node.id)

    let quoteContentEl = $$(this.getComponent('container'), {
      node: quoteContent,
      disabled: this.props.disabled
    }).ref('editor')

    let attribContentEl = $$(TextPropertyEditor, {
      placeholder: 'Enter attribution',
      path: attribContent.getTextPath(),
      disabled: this.props.disabled,
      tagName: 'cite'
    }).addClass('se-attribution')

    el.append(
      quoteContentEl,
      attribContentEl
    )

    return el
  }
}
