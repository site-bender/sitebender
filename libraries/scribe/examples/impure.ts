// Logs a message and returns the current timestamp
export async function logTimestamp(message: string): Promise<number> {
	console.log(`[${new Date().toISOString()}] ${message}`)
	const response = await fetch('/api/log', {
		method: 'POST',
		body: JSON.stringify({ message }),
	})
	return Date.now()
}