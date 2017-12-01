export const normalizePhone = (value) => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10,
  )}`
}

export const firstUpperNextLowerCase = (value) => {
  const newValue = String(value)
  if (!newValue) {
    return newValue
  }
  return newValue
    .slice(0, 1)
    .toUpperCase()
    .concat(newValue
      .slice(1)
      .toLowerCase())
}

export default {}
