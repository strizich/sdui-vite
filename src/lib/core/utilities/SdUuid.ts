const sdUuid = (): string => {
  return Math.random().toString(36).slice(4)
}

export default sdUuid
