/* Keep this file alphabetically sorted */

export const ADDITION_IDENTITY = 0

export const CASTABLE_VALUES = [
	"integer",
	"number",
	"string",
	"boolean",
] as const

export const MATH_OPERATORS = {
	absoluteValue: "absoluteValue",
	add: "add",
	arcCosine: "arcCosine",
	arcHyperbolicCosine: "arcHyperbolicCosine",
	arcHyperbolicSine: "arcHyperbolicSine",
	arcHyperbolicTangent: "arcHyperbolicTangent",
	arcSine: "arcSine",
	arcTangent: "arcTangent",
	average: "average",
	ceiling: "ceiling",
	constructors: "constructors",
	cosecant: "cosecant",
	cosine: "cosine",
	cotangent: "cotangent",
	divide: "divide",
	exponent: "exponent",
	floor: "floor",
	hyperbolicCosine: "hyperbolicCosine",
	hyperbolicSine: "hyperbolicSine",
	hyperbolicTangent: "hyperbolicTangent",
	hypotenuse: "hypotenuse",
	log: "log",
	logBaseTwo: "logBaseTwo",
	max: "max",
	mean: "mean",
	median: "median",
	min: "min",
	mode: "mode",
	modulo: "modulo",
	multiply: "multiply",
	naturalLog: "naturalLog",
	negate: "negate",
	power: "power",
	proportionedRate: "proportionedRate",
	reciprocal: "reciprocal",
	remainder: "remainder",
	root: "root",
	rootMeanSquare: "rootMeanSquare",
	round: "round",
	secant: "secant",
	sign: "sign",
	sine: "sine",
	standardDeviation: "standardDeviation",
	subtract: "subtract",
	tangent: "tangent",
	ternary: "ternary",
	truncate: "truncate",
}

export const MATH_OPERATORS_VALUES = Object.values(MATH_OPERATORS)

export const MULTIPLICATION_IDENTITY = 1

export const OPERAND_TYPES = {
	operator: "operator",
	injector: "injector",
} as const

export const OPERATION_TAGS = {
	algebraic: "algebraic",
	conditional: "conditional",
	injector: "injector",
	numeric: "numeric",
	ternary: "ternary",
}

export const OPERATION_TAGS_VALUES = Object.values(OPERATION_TAGS)
