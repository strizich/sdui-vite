export default (context, props) => {
  const routerComponentPaskel = context.$options.components.RouterLink
  const routerComponentKebab = context.$options.components['router-link']
  const RouterLink = routerComponentPaskel || routerComponentKebab

  return {
    ...props,
    ...RouterLink.options.props
  }
}
