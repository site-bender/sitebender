//++ Parses a hex pair string to a numeric byte value
export default function parsePair(pair: string): number {
	return parseInt(pair, 16)
}

//?? [EXAMPLE] parsePair("ff") // 255
//?? [EXAMPLE] parsePair("a5") // 165
//?? [GOTCHA] Invalid hex characters return NaN
