import isInteger from "../isInteger"

const isTabIndex = value => isInteger(value) && value > -2

export default isTabIndex
