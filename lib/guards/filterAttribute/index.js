const filterAttribute = guard => key => value =>
	value != null && guard(value) ? { [key]: value } : {}

export default filterAttribute
