const encoder = new TextEncoder()

export default async function digestBlakeLike(
	input: string,
): Promise<Uint8Array> {
	const data = encoder.encode(input)
	const buf = await crypto.subtle.digest("SHA-256", data)
	return new Uint8Array(buf)
}
