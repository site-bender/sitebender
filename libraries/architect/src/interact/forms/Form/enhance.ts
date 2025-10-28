//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export function enhanceForm(form: HTMLFormElement) {
	if (!form || form.dataset.enhanced === "true") return
	form.dataset.enhanced = "true"

	// Example: add a basic client-side required check (non-blocking unless empty)
	form.addEventListener("submit", (e) => {
		const requiredInputs = Array.from(
			form.querySelectorAll<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>(
				"[required]",
			),
		)
		let hasError = false
		for (const el of requiredInputs) {
			if (!el.value) {
				hasError = true
				el.setAttribute("aria-invalid", "true")
				const desc = el.getAttribute("aria-describedby")
				if (desc) {
					const msg = form.querySelector(`#${CSS.escape(desc)}`)
					msg?.classList.add("visible")
				}
			}
		}
		if (hasError) {
			// Block submission only when empty required fields exist
			e.preventDefault()
		}
	})
}
