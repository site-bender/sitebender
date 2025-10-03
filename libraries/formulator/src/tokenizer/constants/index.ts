//++ Greek letter name to Unicode character mapping
export const GREEK_LETTER_MAP: Readonly<Record<string, string>> = Object.freeze(
	{
		// Lowercase
		alpha: "α",
		beta: "β",
		gamma: "γ",
		delta: "δ",
		epsilon: "ε",
		zeta: "ζ",
		eta: "η",
		theta: "θ",
		iota: "ι",
		kappa: "κ",
		lambda: "λ",
		mu: "μ",
		nu: "ν",
		xi: "ξ",
		omicron: "ο",
		pi: "π",
		rho: "ρ",
		sigma: "σ",
		tau: "τ",
		upsilon: "υ",
		phi: "φ",
		chi: "χ",
		psi: "ψ",
		omega: "ω",

		// Uppercase
		Alpha: "Α",
		Beta: "Β",
		Gamma: "Γ",
		Delta: "Δ",
		Epsilon: "Ε",
		Zeta: "Ζ",
		Eta: "Η",
		Theta: "Θ",
		Iota: "Ι",
		Kappa: "Κ",
		Lambda: "Λ",
		Mu: "Μ",
		Nu: "Ν",
		Xi: "Ξ",
		Omicron: "Ο",
		Pi: "Π",
		Rho: "Ρ",
		Sigma: "Σ",
		Tau: "Τ",
		Upsilon: "Υ",
		Phi: "Φ",
		Chi: "Χ",
		Psi: "Ψ",
		Omega: "Ω",
	},
)

//++ Mathematical constant name to value mapping
export const CONSTANT_MAP: Readonly<Record<string, string>> = Object.freeze({
	PI: "π",
	Pi: "π",
	pi: "π",
	E: "e",
	e: "e",
	PHI: "φ",
	Phi: "φ",
	phi: "φ",
	TAU: "τ",
	Tau: "τ",
	tau: "τ",
})

//++ Reserved function names that should not be treated as regular identifiers
export const FUNCTION_NAME_SET: ReadonlySet<string> = new Set([
	// Trigonometric
	"sin",
	"cos",
	"tan",
	"sec",
	"csc",
	"cot",
	"asin",
	"acos",
	"atan",
	"atan2",
	"sinh",
	"cosh",
	"tanh",
	"asinh",
	"acosh",
	"atanh",

	// Exponential and logarithmic
	"exp",
	"log",
	"ln",
	"log10",
	"log2",

	// Power and roots
	"sqrt",
	"cbrt",
	"pow",

	// Rounding
	"abs",
	"ceil",
	"floor",
	"round",
	"trunc",
	"sign",

	// Statistical
	"min",
	"max",
	"sum",
	"mean",
	"median",
	"mode",
	"variance",
	"stddev",

	// Other
	"factorial",
	"gcd",
	"lcm",
	"mod",
])
