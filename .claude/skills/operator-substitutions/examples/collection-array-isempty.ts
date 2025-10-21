import isEmpty from "@sitebender/toolsmith/array/isEmpty/index.ts"

/*++
 + Example: Using array isEmpty instead of .length === 0
 + Demonstrates readable array state checking
 */
export default function hasNoErrors(
	errors: ReadonlyArray<string>,
): boolean {
	/*++
	 + Using `isEmpty` to check if error array is empty
	 + Reads as: "is empty errors"
	 + Compare to: errors.length === 0 - requires mental translation
	 */
	return isEmpty(errors)
}
