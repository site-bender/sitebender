/**
 * Compute unique branch identifier
 */

/**
 * Generate a unique identifier for a branch
 * @param type The branch type
 * @param variant The branch variant (true/false, case value, etc.)
 * @param line The line number where the branch occurs
 * @returns Unique branch identifier string
 */
export default function computeBranchId(
	type: string,
	variant: string | boolean,
	line: number
): string {
	const variantStr = typeof variant === 'boolean' 
		? (variant ? 'true' : 'false')
		: String(variant).replace(/[^a-zA-Z0-9]/g, '-')
	
	return `${type}-${variantStr}-${line}`
}