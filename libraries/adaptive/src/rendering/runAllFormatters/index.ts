const runAllFormatters = () =>
	document?.__sbFormatters?.forEach(
		async (id) => await document.querySelector(`#${id}`)?.__sbFormat?.(),
	)

export default runAllFormatters
