import type { Match } from "../../types/index.ts"

//++ Builds a mapper that converts a line into a Match or null
export default function toMatchOrNull(
	filePath: string,
	re: RegExp,
): (line: string, idx: number) => Match | null {
	function mapLine(line: string, idx: number): Match | null {
		return re.test(line) ? { file: filePath, line: idx + 1 } : null
	}

	return mapLine
}
