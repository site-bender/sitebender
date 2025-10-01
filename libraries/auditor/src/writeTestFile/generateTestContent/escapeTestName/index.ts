//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function escapeTestName(name: string): string {
	return name.replace(/"/g, '\\"').replace(/\n/g, "\\n")
}
