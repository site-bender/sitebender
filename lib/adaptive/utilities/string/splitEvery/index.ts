const splitEvery = (n) => (str) =>
	str.length && n > 0 ? [str.slice(0, n), ...splitEvery(n)(str.slice(n))] : []

export default splitEvery
