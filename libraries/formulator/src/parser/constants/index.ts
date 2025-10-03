//++ Parser constants for operator precedence and associativity

import type { BinaryOperator } from "../types/index.ts"

export const PRECEDENCE_LEVELS: Record<BinaryOperator, number> = Object.freeze({
	plus: 1,
	minus: 1,
	multiply: 2,
	divide: 2,
	power: 3,
})

export const RIGHT_ASSOCIATIVE: ReadonlySet<BinaryOperator> = new Set(["power"])
