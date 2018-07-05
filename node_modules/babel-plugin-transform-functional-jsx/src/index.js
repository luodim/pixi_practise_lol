const jsx = require('babel-plugin-syntax-jsx')
const helper = require('babel-helper-builder-react-jsx')
// const react = require('babel-plugin-transform-react-jsx')

module.exports = ({ types: t }) => {
  const JSXSpreadChild = (path) => {
    path.replaceWith(
      t.spreadElement(path.node.expression)
    )
  }

  const visitor = helper({
    post(state, pass) {
      // TODO? @jsx-lowercase-create
      // https://github.com/babel/babel/blob/v6.24.1/packages/babel-plugin-transform-react-jsx/src/index.js#L19
      const { tagExpr } = state
      state.callee = tagExpr
    },
  })
  visitor.JSXSpreadChild = JSXSpreadChild

  return {
    inherits: jsx,
    visitor,
  }
}
