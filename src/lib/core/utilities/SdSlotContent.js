const getChildrenTextContent = (children) => {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}

export default getChildrenTextContent
