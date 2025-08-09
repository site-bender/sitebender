const take = (n) => (arr) => (n > 0 ? arr.toSpliced(n) : [])

export default take
