import { SUPPORTED_FEATURES } from "../../guards/constants/index.ts"

export default function isValidIframeAllow(allow: string): boolean {
	const directives = allow
		.split(";")
		.map((d) => d.trim())
		.filter(Boolean)
	if (directives.length === 0) return false

	const featureName = /^[a-zA-Z0-9-]+$/
	const tokenValue = /^(\*|'self'|'src'|'none')$/
	const originValue = /^https?:\/\/[^\s;]+$/

	for (const dir of directives) {
		const [feature, ...values] = dir.split(/\s+/)
		if (!feature || !featureName.test(feature)) return false
		if (!SUPPORTED_FEATURES.has(feature)) return false

		if (values.length === 0) return false

		for (const v of values) {
			if (tokenValue.test(v) || originValue.test(v)) continue
			return false
		}

		if (values.includes("*") && values.length !== 1) return false
		if (values.includes("'none'") && values.length !== 1) return false
	}

	return true
}
