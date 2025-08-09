import not from "../../predicates/not.js"

const omit = (f) => (arr) => arr.filter((item) => not(f(item)))

export default omit
