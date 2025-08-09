const getByPattern = (op) => {
	const {
		options: { pattern },
	} = op
	const segments = pattern.split("/")
	const parts = window.location.pathname.split("/")

	return {
		right: segments.reduce((out, segment, index) => {
			if (segment.at(0) === ":") {
				const key = segment.substring(1)

				out[key] = parts[index]
			}

			return out
		}, {}),
	}
}

export default getByPattern
