const runAllDisplayCallbacks = () =>
	Object.values(document?.__sbDisplayCallbacks || {}).forEach(
		(arr: Array<(arg?: unknown, localValues?: unknown) => void | Promise<void>> = []) =>
			arr.forEach(async (f) => await f()),
	)

export default runAllDisplayCallbacks
