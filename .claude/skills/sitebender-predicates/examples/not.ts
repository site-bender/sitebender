import type { Value } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Performs logical NOT operation on a value
 + Negates the truthiness of any value
 */
export default function not(value: Value): boolean {
	/*++
	 + [EXCEPTION] this is the ONLY permitted use of the ! operator
	 + Everywhere else, use this `not` function instead
	 */
	return !value
}
