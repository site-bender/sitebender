/**
 * Escapes special characters in test names
 * @param name Test name to escape
 * @returns Escaped test name safe for strings
 */
export default function escapeTestName(name: string): string {
	return name.replace(/"/g, '\\"').replace(/\n/g, "\\n")
}
