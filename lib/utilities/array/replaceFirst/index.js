import replaceAt from "../replaceAt"

const replaceFirst = item => f => arr => replaceAt(arr.indexOf(item))(f)(arr)

export default replaceFirst
