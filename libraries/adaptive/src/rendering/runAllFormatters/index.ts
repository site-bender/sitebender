const runAllFormatters = () =>
	document?.__sbFormatters?.forEach(
		async (id: string) =>
			await (document.querySelector(`#${id}`) as HTMLElement | null)?.
				__sbFormat?.(),
	)

export default runAllFormatters
