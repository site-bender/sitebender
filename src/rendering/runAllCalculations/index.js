const runAllCalculations = () =>
	document?.__sbCalculators?.forEach(id =>
		document.querySelector(`#${id}`)?.__sbCalculate?.(),
	)

export default runAllCalculations
