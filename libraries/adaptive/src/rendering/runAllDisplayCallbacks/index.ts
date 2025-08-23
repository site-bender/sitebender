const runAllDisplayCallbacks = () =>
	Object.values(document?.__sbDisplayCallbacks || {}).forEach((arr = []) =>
		arr.forEach(async (f) => await f())
	)

export default runAllDisplayCallbacks
