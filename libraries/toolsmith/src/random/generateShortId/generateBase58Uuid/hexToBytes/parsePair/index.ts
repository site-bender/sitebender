//++ Parses a hex pair string to a numeric byte value
export default function parsePair(pair: string): number {
	//++ [EXCEPTION] parseInt permitted in Toolsmith for performance - provides hexadecimal string to number conversion wrapper
	return parseInt(pair, 16)
}
