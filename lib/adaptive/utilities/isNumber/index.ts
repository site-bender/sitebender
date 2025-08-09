const isNumber = (value) => /^[+-]?([0-9]*[.])?[0-9]+$/.test(String(value))

export default isNumber
