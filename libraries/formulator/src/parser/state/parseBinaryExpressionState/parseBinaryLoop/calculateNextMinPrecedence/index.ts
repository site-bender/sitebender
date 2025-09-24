import type { Associativity } from "../../types/index.ts"

import { ASSOCIATIVITY } from "../../constants/index.ts"

//++ Calculates the next minimum precedence for binary expression parsing
export default function calculateNextMinPrecedence(
	associativity: Associativity,
) {
	return function (precedence: number): number {
		if (associativity === ASSOCIATIVITY.left) {
			return precedence + 1
		}

		return precedence
	}
}
