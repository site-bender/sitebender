const runAllDisplayCallbacks = () =>
	Object.values(document?.__sbDisplayCallbacks || {}).forEach((arr = []) =>
		arr.forEach(f => f()),
	)

export default runAllDisplayCallbacks
