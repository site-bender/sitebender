import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const normalize = (
	form: "NFC" | "NFD" | "NFKC" | "NFKD" | null | undefined = "NFC",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Default to NFC if form is invalid
	const normalForm = form && ["NFC", "NFD", "NFKC", "NFKD"].includes(form)
		? form
		: "NFC"

	// Use native normalize method
	return str.normalize(normalForm)
}

export default normalize
