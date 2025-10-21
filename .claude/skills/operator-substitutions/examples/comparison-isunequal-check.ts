import isUnequal from "@sitebender/toolsmith/validation/isUnequal/index.ts"

/*++
 + Example: Using `isUnequal` for inequality comparison instead of !==
 + Demonstrates readable deep inequality checking
 */
export default function hasChanged<T>(previous: T, current: T): boolean {
	/*++
	 + Using `isUnequal` to check if values differ
	 + Reads as: "current is unequal to previous"
	 + Compare to: current !== previous (requires mental parsing)
	 */
	return isUnequal(current)(previous)
}
