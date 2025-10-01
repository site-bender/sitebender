//++ Checks if an identifier is a global (impure)
export default function isGlobalIdentifier(text: string): boolean {
	const globals = [
		"console",
		"window",
		"document",
		"global",
		"process",
		"Buffer",
		"setTimeout",
		"setInterval",
		"clearTimeout",
		"clearInterval",
		"fetch",
		"XMLHttpRequest",
		"localStorage",
		"sessionStorage",
	]
	return globals.includes(text)
}
