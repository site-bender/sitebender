const dropLast = (n) => (arr) => (n > 0 ? arr.toSpliced(-n) : arr.slice(0))

export default dropLast
