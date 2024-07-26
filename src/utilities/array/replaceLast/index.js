import replaceAt from "../replaceAt"

const replaceLast = item => f => arr => replaceAt(arr.lastIndexOf(item))(f)(arr)

export default replaceLast
