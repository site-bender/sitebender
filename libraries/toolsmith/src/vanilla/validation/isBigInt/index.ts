//++ Type guard that checks if a value is a bigint primitive
export default function isBigInt(value: unknown): value is bigint {
	return typeof value === "bigint"
}

//?? [EXAMPLE] isBigInt(123n) // true
//?? [EXAMPLE] isBigInt(BigInt(456)) // true
//?? [EXAMPLE] isBigInt(BigInt("789")) // true
//?? [EXAMPLE] isBigInt(123) // false (regular number)
//?? [EXAMPLE] isBigInt("123") // false (string)
//?? [EXAMPLE] isBigInt(null) // false
//?? [EXAMPLE] isBigInt(undefined) // false
/*??
 | [EXAMPLE]
 | const processLargeInt = (value: unknown): string =>
 |   isBigInt(value) ? value.toString() : "0"
 |
 | const safeBigIntOperation = (value: unknown): bigint =>
 |   isBigInt(value) ? value + 1n : 0n
 |
 | const mixed = [123n, 456, "789", null, BigInt(999)]
 | const bigints = mixed.filter(isBigInt)  // [123n, BigInt(999)]
 |
 | [PRO] Works with both literal bigint (123n) and BigInt() constructor
 | [PRO] Proper type narrowing for TypeScript
 | [CON] None - bigint is a primitive type
 | [GOTCHA] Remember the 'n' suffix for bigint literals
 |
*/
