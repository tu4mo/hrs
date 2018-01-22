const getEntriesByType = (entries = {}, type) => {
  return Object.keys(entries).reduce((acc, curr) => {
    if (entries[curr].type === type) {
      return {
        ...acc,
        [curr]: {
          ...entries[curr]
        }
      }
    } else {
      return acc
    }
  }, {})
}

module.exports = {
  getEntriesByType
}
