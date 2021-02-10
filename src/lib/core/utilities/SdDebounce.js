export default (funct, time) => {
  let timeout
  return function () {
    const functCall = () => funct.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(functCall, time)
  }
}
