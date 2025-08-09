const splitAt = (i) => (s) =>
	i < s.length && i > -s.length ? [s.slice(0, i), s.slice(i)] : [s.slice(0)]

export default splitAt
