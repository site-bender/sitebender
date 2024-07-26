import isUndefined from "../isUndefined"
import not from "../predicates/not"

const isDefined = value => not(isUndefined(value))

export default isDefined
