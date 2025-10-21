import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Example: Using `not` instead of ! operator
 + Demonstrates readable negation
 */
export default function canProceed(isBlocked: boolean): boolean {
	/*++
	 + Using `not` function
	 + Reads as: "not is blocked"
	 + Compare to: !isBlocked - requires mental parsing
	 */
	return not(isBlocked)
}
