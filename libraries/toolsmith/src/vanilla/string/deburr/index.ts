import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const deburr = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Normalize to NFD (Canonical Decomposition) to separate base characters from combining marks
	// Then remove combining diacritical marks (Unicode category Mn)
	// Also handle some special Latin characters that don't decompose
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
		.replace(/ø/g, "o")
		.replace(/Ø/g, "O")
		.replace(/æ/g, "ae")
		.replace(/Æ/g, "AE")
		.replace(/œ/g, "oe")
		.replace(/Œ/g, "OE")
		.replace(/ð/g, "d")
		.replace(/Ð/g, "D")
		.replace(/þ/g, "th")
		.replace(/Þ/g, "Th")
		.replace(/ß/g, "ss")
		.replace(/ł/g, "l")
		.replace(/Ł/g, "L")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.replace(/ı/g, "i")
		.replace(/İ/g, "I")
}

export default deburr
