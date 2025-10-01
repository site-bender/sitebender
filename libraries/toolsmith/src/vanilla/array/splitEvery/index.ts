//++ Splits array into fixed-size chunks
const splitEvery =
	(chunkSize: number) => <T>(array: Array<T>): Array<Array<T>> =>
		array.length && chunkSize > 0
			? [
				array.slice(0, chunkSize),
				...splitEvery(chunkSize)(array.slice(chunkSize)),
			]
			: []

export default splitEvery
