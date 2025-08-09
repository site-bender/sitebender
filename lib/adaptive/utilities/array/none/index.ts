import not from "../../predicates/not"

const none = (f) => (arr) => not(arr.filter(f).length)

export default none
