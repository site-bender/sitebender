import isBoolean from "../isBoolean"

const isEmptyStringOrBoolean = value => value === "" || isBoolean(value)

export default isEmptyStringOrBoolean
