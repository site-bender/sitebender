import type {
	Associativity,
	BinaryOperatorTokenType,
	Operator,
} from "../types/index.ts"

export const TOKEN_TO_OPERATOR_MAP: Record<BinaryOperatorTokenType, Operator> =
	{
		PLUS: "+",
		MINUS: "-",
		MULTIPLY: "*",
		DIVIDE: "/",
		POWER: "^",
		LESS_THAN: "<",
		GREATER_THAN: ">",
		EQUAL: "==",
		NOT_EQUAL: "!=",
		LESS_EQUAL: "<=",
		GREATER_EQUAL: ">=",
	} as const

export const ASSOCIATIVITY: Record<"left" | "right", Associativity> = {
	left: "LEFT",
	right: "RIGHT",
} as const
