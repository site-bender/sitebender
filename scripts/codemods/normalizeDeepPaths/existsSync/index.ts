//++ Synchronously checks if a file or directory exists
export default function existsSync(p: string): boolean {
	try {
		Deno.statSync(p)

		return true
	} catch {
		return false
	}
}

//?? [EXAMPLE]
// existsSync("/path/to/file.ts") // Returns: true if exists, false otherwise
// existsSync("/nonexistent/path") // Returns: false
