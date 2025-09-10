//++ Strip leading marker + trailing */ from block comment
export default function stripBlock(full: string): string {
	return full
		.replace(/^\/\*\+\+/, "")
		.replace(/^\/\*\?\?/, "")
		.replace(/^\/\*--/, "")
		.replace(/\*\/$/, "")
		.trim()
}
