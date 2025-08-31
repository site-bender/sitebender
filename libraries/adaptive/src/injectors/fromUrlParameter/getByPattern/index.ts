type PatternOp = { options: { pattern: string } }
const getByPattern = (op: PatternOp) => {
	const {
		options: { pattern },
	} = op
	const segments = pattern.split("/")
	const parts =
		(globalThis as { location?: { pathname?: string } }).location?.pathname
			?.split("/") ?? []

	return {
		right: segments.reduce<Record<string, string | undefined>>(
			(out, segment, index) => {
				if (segment.at(0) === ":") {
					const key = segment.substring(1)

					out[key] = parts[index]
				}

				return out
			},
			{},
		),
	}
}

export default getByPattern
