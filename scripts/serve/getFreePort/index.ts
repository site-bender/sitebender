export default function getFreePort(start = 5555): number {
	for (let p = start; p < start + 100; p++) {
		try {
			const ac = new AbortController()
			const server = Deno.serve(
				{ port: p, signal: ac.signal },
				() => new Response("OK"),
			)
			ac.abort()
			// Best-effort immediate shutdown without awaiting inside loop
			try {
				// deno-lint-ignore no-explicit-any
				;(server as any).shutdown?.()
			} catch {
				// ignore
			}
			return p
		} catch {
			// Port busy; continue
		}
	}
	return start
}
