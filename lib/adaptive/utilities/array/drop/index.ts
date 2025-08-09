const drop = (n) => (arr) => (n >= 0 ? arr.slice(n) : arr.slice(0))

export default drop
