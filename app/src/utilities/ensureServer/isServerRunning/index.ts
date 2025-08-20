const isServerRunning = async (port: number): Promise<boolean> => {
	try {
		const response = await fetch(`http://localhost:${port}`, {
			method: "HEAD",
			signal: AbortSignal.timeout(1000),
		})
		return response.ok
	} catch {
		return false
	}
}

export default isServerRunning
