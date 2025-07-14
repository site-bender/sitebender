export default function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
	// Note: We do NOT escape quotes/apostrophes as we use proper
	// UTF-8 typographic characters (", ", ', ') that should render literally
}
