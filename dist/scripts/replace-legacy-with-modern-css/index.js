import supportsCssLayers from "../supports-css-layers/index.js"

export default function replaceLegacyWithModernCss(){
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
