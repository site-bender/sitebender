//++ Logs a warning message
export default function logWarning(_: null, warning: string): null {
	console.warn(`⚠️  Warning: ${warning}`)
	return null
}