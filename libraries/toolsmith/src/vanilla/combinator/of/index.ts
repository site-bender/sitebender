//++ Wraps a value in an array (singleton), creating a single-element array containing the value
const of = <T>(value: T): Array<T> => [value]


export default of
