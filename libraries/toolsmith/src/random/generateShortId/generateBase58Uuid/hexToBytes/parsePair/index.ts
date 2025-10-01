//++ Parses a hex pair string to a numeric byte value
export default function parsePair(pair: string): number {
	return parseInt(pair, 16)
}
