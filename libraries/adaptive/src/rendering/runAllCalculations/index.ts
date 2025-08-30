const runAllCalculations = () =>
	document?.__sbCalculators?.forEach(
		async (id: string) =>
			await (document.querySelector(`#${id}`) as HTMLElement | null)?.
				__sbCalculate?.(),
	)

export default runAllCalculations
