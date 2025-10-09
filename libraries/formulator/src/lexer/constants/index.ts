//++ Character classification types for lexical analysis
export type CharacterClass =
	| { _tag: "Letter"; character: string } // A-Z
	| { _tag: "letter"; character: string } // a-z
	| { _tag: "alpha"; character: string } // α
	| { _tag: "beta"; character: string } // β
	| { _tag: "gamma"; character: string } // γ
	| { _tag: "delta"; character: string } // δ
	| { _tag: "epsilon"; character: string } // ε
	| { _tag: "zeta"; character: string } // ζ
	| { _tag: "eta"; character: string } // η
	| { _tag: "theta"; character: string } // θ
	| { _tag: "iota"; character: string } // ι
	| { _tag: "kappa"; character: string } // κ
	| { _tag: "lambda"; character: string } // λ
	| { _tag: "mu"; character: string } // μ
	| { _tag: "nu"; character: string } // ν
	| { _tag: "xi"; character: string } // ξ
	| { _tag: "omicron"; character: string } // ο
	| { _tag: "pi"; character: string } // π
	| { _tag: "rho"; character: string } // ρ
	| { _tag: "sigma"; character: string } // σ (also ς final sigma)
	| { _tag: "tau"; character: string } // τ
	| { _tag: "upsilon"; character: string } // υ
	| { _tag: "phi"; character: string } // φ
	| { _tag: "chi"; character: string } // χ
	| { _tag: "psi"; character: string } // ψ
	| { _tag: "omega"; character: string } // ω
	| { _tag: "Alpha"; character: string } // Α
	| { _tag: "Beta"; character: string } // Β
	| { _tag: "Gamma"; character: string } // Γ
	| { _tag: "Delta"; character: string } // Δ
	| { _tag: "Epsilon"; character: string } // Ε
	| { _tag: "Zeta"; character: string } // Ζ
	| { _tag: "Eta"; character: string } // Η
	| { _tag: "Theta"; character: string } // Θ
	| { _tag: "Iota"; character: string } // Ι
	| { _tag: "Kappa"; character: string } // Κ
	| { _tag: "Lambda"; character: string } // Λ
	| { _tag: "Mu"; character: string } // Μ
	| { _tag: "Nu"; character: string } // Ν
	| { _tag: "Xi"; character: string } // Ξ
	| { _tag: "Omicron"; character: string } // Ο
	| { _tag: "Pi"; character: string } // Π
	| { _tag: "Rho"; character: string } // Ρ
	| { _tag: "Sigma"; character: string } // Σ
	| { _tag: "Tau"; character: string } // Τ
	| { _tag: "Upsilon"; character: string } // Υ
	| { _tag: "Phi"; character: string } // Φ
	| { _tag: "Chi"; character: string } // Χ
	| { _tag: "Psi"; character: string } // Ψ
	| { _tag: "Omega"; character: string } // Ω
	| { _tag: "digit"; character: string } // 0-9
	| { _tag: "whitespace" }
	| { _tag: "multiply"; character: string } // *, ×, ·, ⋅, ∗
	| { _tag: "divide"; character: string } // /, ÷, ∕
	| { _tag: "plus"; character: string } // +, ➕
	| { _tag: "minus"; character: string } // -, −, ➖
	| { _tag: "power"; character: string } // ^, ‸
	| { _tag: "leftParen"; character: string } // (, ❨
	| { _tag: "rightParen"; character: string } // ), ❩
	| { _tag: "decimalPoint"; character: string } // .
	| { _tag: "lessThan"; character: string } // <
	| { _tag: "greaterThan"; character: string } // >
	| { _tag: "equals"; character: string } // =
	| { _tag: "exclamation"; character: string } // !
	| { _tag: "ampersand"; character: string } // &
	| { _tag: "pipe"; character: string } // |
	| { _tag: "unknown"; character: string }

//++ Immutable Unicode character code to CharacterClass mapping (hard-coded, O(1) lookup)
export const CHARACTER_MAP: Readonly<Record<number, CharacterClass>> = Object
	.freeze(
		{
			// Digits 0-9
			0x30: Object.freeze({ _tag: "digit", character: "0" }),
			0x31: Object.freeze({ _tag: "digit", character: "1" }),
			0x32: Object.freeze({ _tag: "digit", character: "2" }),
			0x33: Object.freeze({ _tag: "digit", character: "3" }),
			0x34: Object.freeze({ _tag: "digit", character: "4" }),
			0x35: Object.freeze({ _tag: "digit", character: "5" }),
			0x36: Object.freeze({ _tag: "digit", character: "6" }),
			0x37: Object.freeze({ _tag: "digit", character: "7" }),
			0x38: Object.freeze({ _tag: "digit", character: "8" }),
			0x39: Object.freeze({ _tag: "digit", character: "9" }),

			// Uppercase Roman letters A-Z
			0x41: Object.freeze({ _tag: "Letter", character: "A" }),
			0x42: Object.freeze({ _tag: "Letter", character: "B" }),
			0x43: Object.freeze({ _tag: "Letter", character: "C" }),
			0x44: Object.freeze({ _tag: "Letter", character: "D" }),
			0x45: Object.freeze({ _tag: "Letter", character: "E" }),
			0x46: Object.freeze({ _tag: "Letter", character: "F" }),
			0x47: Object.freeze({ _tag: "Letter", character: "G" }),
			0x48: Object.freeze({ _tag: "Letter", character: "H" }),
			0x49: Object.freeze({ _tag: "Letter", character: "I" }),
			0x4a: Object.freeze({ _tag: "Letter", character: "J" }),
			0x4b: Object.freeze({ _tag: "Letter", character: "K" }),
			0x4c: Object.freeze({ _tag: "Letter", character: "L" }),
			0x4d: Object.freeze({ _tag: "Letter", character: "M" }),
			0x4e: Object.freeze({ _tag: "Letter", character: "N" }),
			0x4f: Object.freeze({ _tag: "Letter", character: "O" }),
			0x50: Object.freeze({ _tag: "Letter", character: "P" }),
			0x51: Object.freeze({ _tag: "Letter", character: "Q" }),
			0x52: Object.freeze({ _tag: "Letter", character: "R" }),
			0x53: Object.freeze({ _tag: "Letter", character: "S" }),
			0x54: Object.freeze({ _tag: "Letter", character: "T" }),
			0x55: Object.freeze({ _tag: "Letter", character: "U" }),
			0x56: Object.freeze({ _tag: "Letter", character: "V" }),
			0x57: Object.freeze({ _tag: "Letter", character: "W" }),
			0x58: Object.freeze({ _tag: "Letter", character: "X" }),
			0x59: Object.freeze({ _tag: "Letter", character: "Y" }),
			0x5a: Object.freeze({ _tag: "Letter", character: "Z" }),

			// Lowercase Roman letters a-z
			0x61: Object.freeze({ _tag: "letter", character: "a" }),
			0x62: Object.freeze({ _tag: "letter", character: "b" }),
			0x63: Object.freeze({ _tag: "letter", character: "c" }),
			0x64: Object.freeze({ _tag: "letter", character: "d" }),
			0x65: Object.freeze({ _tag: "letter", character: "e" }),
			0x66: Object.freeze({ _tag: "letter", character: "f" }),
			0x67: Object.freeze({ _tag: "letter", character: "g" }),
			0x68: Object.freeze({ _tag: "letter", character: "h" }),
			0x69: Object.freeze({ _tag: "letter", character: "i" }),
			0x6a: Object.freeze({ _tag: "letter", character: "j" }),
			0x6b: Object.freeze({ _tag: "letter", character: "k" }),
			0x6c: Object.freeze({ _tag: "letter", character: "l" }),
			0x6d: Object.freeze({ _tag: "letter", character: "m" }),
			0x6e: Object.freeze({ _tag: "letter", character: "n" }),
			0x6f: Object.freeze({ _tag: "letter", character: "o" }),
			0x70: Object.freeze({ _tag: "letter", character: "p" }),
			0x71: Object.freeze({ _tag: "letter", character: "q" }),
			0x72: Object.freeze({ _tag: "letter", character: "r" }),
			0x73: Object.freeze({ _tag: "letter", character: "s" }),
			0x74: Object.freeze({ _tag: "letter", character: "t" }),
			0x75: Object.freeze({ _tag: "letter", character: "u" }),
			0x76: Object.freeze({ _tag: "letter", character: "v" }),
			0x77: Object.freeze({ _tag: "letter", character: "w" }),
			0x78: Object.freeze({ _tag: "letter", character: "x" }),
			0x79: Object.freeze({ _tag: "letter", character: "y" }),
			0x7a: Object.freeze({ _tag: "letter", character: "z" }),

			// Greek uppercase letters Α-Ω
			0x0391: Object.freeze({ _tag: "Alpha", character: "Α" }),
			0x0392: Object.freeze({ _tag: "Beta", character: "Β" }),
			0x0393: Object.freeze({ _tag: "Gamma", character: "Γ" }),
			0x0394: Object.freeze({ _tag: "Delta", character: "Δ" }),
			0x0395: Object.freeze({ _tag: "Epsilon", character: "Ε" }),
			0x0396: Object.freeze({ _tag: "Zeta", character: "Ζ" }),
			0x0397: Object.freeze({ _tag: "Eta", character: "Η" }),
			0x0398: Object.freeze({ _tag: "Theta", character: "Θ" }),
			0x0399: Object.freeze({ _tag: "Iota", character: "Ι" }),
			0x039a: Object.freeze({ _tag: "Kappa", character: "Κ" }),
			0x039b: Object.freeze({ _tag: "Lambda", character: "Λ" }),
			0x039c: Object.freeze({ _tag: "Mu", character: "Μ" }),
			0x039d: Object.freeze({ _tag: "Nu", character: "Ν" }),
			0x039e: Object.freeze({ _tag: "Xi", character: "Ξ" }),
			0x039f: Object.freeze({ _tag: "Omicron", character: "Ο" }),
			0x03a0: Object.freeze({ _tag: "Pi", character: "Π" }),
			0x03a1: Object.freeze({ _tag: "Rho", character: "Ρ" }),
			0x03a3: Object.freeze({ _tag: "Sigma", character: "Σ" }),
			0x03a4: Object.freeze({ _tag: "Tau", character: "Τ" }),
			0x03a5: Object.freeze({ _tag: "Upsilon", character: "Υ" }),
			0x03a6: Object.freeze({ _tag: "Phi", character: "Φ" }),
			0x03a7: Object.freeze({ _tag: "Chi", character: "Χ" }),
			0x03a8: Object.freeze({ _tag: "Psi", character: "Ψ" }),
			0x03a9: Object.freeze({ _tag: "Omega", character: "Ω" }),

			// Greek lowercase letters α-ω
			0x03b1: Object.freeze({ _tag: "alpha", character: "α" }),
			0x03b2: Object.freeze({ _tag: "beta", character: "β" }),
			0x03b3: Object.freeze({ _tag: "gamma", character: "γ" }),
			0x03b4: Object.freeze({ _tag: "delta", character: "δ" }),
			0x03b5: Object.freeze({ _tag: "epsilon", character: "ε" }),
			0x03b6: Object.freeze({ _tag: "zeta", character: "ζ" }),
			0x03b7: Object.freeze({ _tag: "eta", character: "η" }),
			0x03b8: Object.freeze({ _tag: "theta", character: "θ" }),
			0x03b9: Object.freeze({ _tag: "iota", character: "ι" }),
			0x03ba: Object.freeze({ _tag: "kappa", character: "κ" }),
			0x03bb: Object.freeze({ _tag: "lambda", character: "λ" }),
			0x03bc: Object.freeze({ _tag: "mu", character: "μ" }),
			0x03bd: Object.freeze({ _tag: "nu", character: "ν" }),
			0x03be: Object.freeze({ _tag: "xi", character: "ξ" }),
			0x03bf: Object.freeze({ _tag: "omicron", character: "ο" }),
			0x03c0: Object.freeze({ _tag: "pi", character: "π" }),
			0x03c1: Object.freeze({ _tag: "rho", character: "ρ" }),
			0x03c2: Object.freeze({ _tag: "sigma", character: "ς" }), // final sigma
			0x03c3: Object.freeze({ _tag: "sigma", character: "σ" }),
			0x03c4: Object.freeze({ _tag: "tau", character: "τ" }),
			0x03c5: Object.freeze({ _tag: "upsilon", character: "υ" }),
			0x03c6: Object.freeze({ _tag: "phi", character: "φ" }),
			0x03c7: Object.freeze({ _tag: "chi", character: "χ" }),
			0x03c8: Object.freeze({ _tag: "psi", character: "ψ" }),
			0x03c9: Object.freeze({ _tag: "omega", character: "ω" }),

			// Multiplication symbols
			0x002a: Object.freeze({ _tag: "multiply", character: "*" }),
			0x00d7: Object.freeze({ _tag: "multiply", character: "×" }),
			0x00b7: Object.freeze({ _tag: "multiply", character: "·" }),
			0x22c5: Object.freeze({ _tag: "multiply", character: "⋅" }),
			0x2217: Object.freeze({ _tag: "multiply", character: "∗" }),

			// Division symbols
			0x002f: Object.freeze({ _tag: "divide", character: "/" }),
			0x00f7: Object.freeze({ _tag: "divide", character: "÷" }),
			0x2215: Object.freeze({ _tag: "divide", character: "∕" }),

			// Plus symbols
			0x002b: Object.freeze({ _tag: "plus", character: "+" }),
			0x2795: Object.freeze({ _tag: "plus", character: "➕" }),

			// Minus symbols
			0x002d: Object.freeze({ _tag: "minus", character: "-" }),
			0x2212: Object.freeze({ _tag: "minus", character: "−" }),
			0x2796: Object.freeze({ _tag: "minus", character: "➖" }),

			// Power symbols
			0x005e: Object.freeze({ _tag: "power", character: "^" }),
			0x2038: Object.freeze({ _tag: "power", character: "‸" }),

			// Parentheses
			0x0028: Object.freeze({ _tag: "leftParen", character: "(" }),
			0x2768: Object.freeze({ _tag: "leftParen", character: "❨" }),
			0x0029: Object.freeze({ _tag: "rightParen", character: ")" }),
			0x2769: Object.freeze({ _tag: "rightParen", character: "❩" }),

			// Decimal point
			0x002e: Object.freeze({ _tag: "decimalPoint", character: "." }),

			// Comparison operators
			0x003c: Object.freeze({ _tag: "lessThan", character: "<" }),
			0x003e: Object.freeze({ _tag: "greaterThan", character: ">" }),
			0x003d: Object.freeze({ _tag: "equals", character: "=" }),
			0x0021: Object.freeze({ _tag: "exclamation", character: "!" }),

			// Logical operators
			0x0026: Object.freeze({ _tag: "ampersand", character: "&" }),
			0x007c: Object.freeze({ _tag: "pipe", character: "|" }),

			// Whitespace
			0x0020: Object.freeze({ _tag: "whitespace" }),
			0x0009: Object.freeze({ _tag: "whitespace" }),
			0x000a: Object.freeze({ _tag: "whitespace" }),
			0x000d: Object.freeze({ _tag: "whitespace" }),
			0x00a0: Object.freeze({ _tag: "whitespace" }),
		},
	)

//++ Two-character operator mapping for composite key lookup
export const TWO_CHARACTER_OPERATOR_MAP: Readonly<Record<string, string>> =
	Object.freeze({
		"0x003C_0x003D": "lessThanOrEqual", // <=
		"0x003E_0x003D": "greaterThanOrEqual", // >=
		"0x0021_0x003D": "notEqual", // !=
		"0x003D_0x003D": "equalTo", // ==
		"0x0026_0x0026": "and", // &&
		"0x007C_0x007C": "or", // ||
		"0x005E_0x005E": "xor", // ^^
		"0x002D_0x003E": "implies", // ->
	})
