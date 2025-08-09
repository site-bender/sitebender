const omit = (keys) => (obj) =>
	Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)))

export default omit
