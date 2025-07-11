import supportsCssLayers from "../supportsCssLayers/index.ts"

export default function replaceLegacyWithModernCss(): void {
	const legacyStylesheet = document.getElementById("legacy-styles")
	const modernStylesheet = document.getElementById("modern-styles")

	if (!legacyStylesheet || !modernStylesheet) {
		return
	}

	if (supportsCssLayers()) {
		legacyStylesheet.setAttribute("disabled", "true")
		modernStylesheet.removeAttribute("disabled")
	}
}
