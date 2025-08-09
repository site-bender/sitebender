const flatMap = (f) => (arr) => (Array.isArray(arr) ? arr?.flatMap(f) : arr)

export default flatMap
