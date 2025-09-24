//++ Finds the first available TCP port starting from the given port number
export default function getFreePort(start = 5555): number {
	for (let p = start; p < start + 100; p++) {
		let listener: Deno.Listener | null = null
		try {
			// Use a raw TCP listener to probe availability, then close immediately.
			listener = Deno.listen({ hostname: "0.0.0.0", port: p })
			listener.close()
			return p
		} catch {
			// Port busy; continue
			try {
				listener?.close()
			} catch { /* ignore */ }
		}
	}
	return start
}
