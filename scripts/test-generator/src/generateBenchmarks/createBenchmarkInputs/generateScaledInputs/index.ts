/**
 * Generate inputs scaled across different sizes for complexity analysis
 */

/**
 * Generate scaled inputs for complexity testing
 * @param inputType Type of input to generate
 * @param sizes Array of sizes to generate
 * @returns Array of scaled inputs with size metadata
 */
export default function generateScaledInputs(
	inputType: string,
	sizes: Array<number>
): Array<{ size: number, input: unknown }> {
	const scaledInputs: Array<{ size: number, input: unknown }> = []
	
	for (const size of sizes) {
		let input: unknown
		
		switch (inputType) {
			case 'array':
				input = Array.from({ length: size }, (_, i) => i)
				break
				
			case 'string':
				input = 'x'.repeat(size)
				break
				
			case 'number':
				input = size
				break
				
			case 'object':
				const obj: Record<string, number> = {}
				for (let i = 0; i < size; i++) {
					obj[`key${i}`] = i
				}
				input = obj
				break
				
			default:
				input = size
		}
		
		scaledInputs.push({ size, input })
	}
	
	return scaledInputs
}