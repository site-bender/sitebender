import not from "../../predicates/not"

const omit = f => arr => arr.filter(item => not(f(item)))

export default omit
