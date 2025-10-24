/*++
 + Used in reduce to sum items
 + [EXCEPTION] functions passed to reduce should not be curried
 */
export default function _sumItems(sum: number, item: number): number {
	return sum + item
}
