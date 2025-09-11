import type { ParseError, Result, Token } from "../../types/index.ts"

import { TOKEN_PATTERNS } from "../../constants/index.ts"

//++ Parses a number token (integer or decimal) at the current position with validation
export default function parseNumber(
	input: string,
	position: number,
): Result<{ token: Token; length: number }, ParseError> {
	const numberMatch = TOKEN_PATTERNS.NUMBER.exec(input.slice(position))
	if (!numberMatch) {
		return {
			ok: false,
			error: {
				message: "No number found",
				position,
			},
		}
	}

	// Check for invalid number formats like "3.14.159"
	const afterNumber = input.slice(position + numberMatch[0].length)
	if (afterNumber.startsWith(".") && /^\.\d/.test(afterNumber)) {
		return {
			ok: false,
			error: {
				message: `Invalid number format at position ${position}: ${
					numberMatch[0] + afterNumber.slice(0, 4)
				}`,
				position,
			},
		}
	}

	const token: Token = {
		type: "NUMBER",
		value: numberMatch[0],
		position,
	}

	return {
		ok: true,
		value: { token, length: numberMatch[0].length },
	}
}

/*??
 | [EXAMPLE]
 | parseNumber("42", 0)
 | // { ok: true, value: { token: { type: "NUMBER", value: "42", position: 0 }, length: 2 } }
 |
 | [EXAMPLE]
 | parseNumber("3.14", 0)
 | // { ok: true, value: { token: { type: "NUMBER", value: "3.14", position: 0 }, length: 4 } }
 |
 | [EXAMPLE]
 | parseNumber("3.14.159", 0)
 | // { ok: false, error: { message: "Invalid number format at position 0: 3.14.159", position: 0 } }
 |
 | [GOTCHA]
 | Numbers are stored as strings in tokens and only converted to numeric values during compilation.
 | This preserves exact input format and avoids floating point precision issues during parsing.
 |
 | [GOTCHA]
 | The pattern matches greedy decimals, so "3.14.159" matches "3.14" first,
 | then validation catches the invalid second decimal point.
 |
 | [PRO]
 | Validates against malformed numbers like multiple decimal points that regex alone would miss.
 |
 | [CON]
 | No support for scientific notation (1e10), hexadecimal (0xFF), or underscore separators (1_000).
 |
*/
