import _convertAttributeEntry from "../_convertAttributeEntry/index.ts"

/*++
 + [EXCEPTION] Uncurried wrapper function needed for reduce
 + reduce expects: (accumulator, item) => result
 + This wraps the curried _convertAttributeEntry for use with reduce
 */
export default function _reduceAttributes(
	acc: Readonly<Record<string, string>>,
	entry: readonly [string, unknown],
): Readonly<Record<string, string>> {
	return _convertAttributeEntry(acc)(entry)
}
