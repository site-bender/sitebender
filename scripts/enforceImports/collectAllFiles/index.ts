import walkTsFiles from "../walkTsFiles/index.ts"

//++ Collects all files from an async generator into an array
export default async function collectAllFiles(root: string): Promise<Array<string>> {
	const files: Array<string> = []

	async function collectNext(generator: AsyncGenerator<string>): Promise<void> {
		const { value, done } = await generator.next()
		if (!done) {
			files.push(value)
			await collectNext(generator)
		}
	}

	await collectNext(walkTsFiles(root))
	return files
}