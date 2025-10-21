import isNotEmpty from "@sitebender/toolsmith/object/isNotEmpty/index.ts"

/*++
 + Example: Using object isNotEmpty instead of Object.keys checks
 + Demonstrates readable object state checking
 */
export default function hasConfiguration(
	config: Record<string, unknown>,
): boolean {
	/*++
	 + Using `isNotEmpty` to check if object has properties
	 + Reads as: "is not empty config"
	 + Compare to: Object.keys(config).length > 0 - implementation detail leak
	 */
	return isNotEmpty(config)
}
