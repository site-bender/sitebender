const runAllCalculations = () =>
	document?.__sbCalculators?.forEach(
		async (id) => await document.querySelector(`#${id}`)?.__sbCalculate?.(),
	)

export default runAllCalculations
