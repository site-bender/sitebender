//++ Auto-curries a function to allow partial application, transforming it to accept arguments one at a time
// deno-lint-ignore no-explicit-any
const curry = (fn: (...args: any[]) => any): any => {
 	const arity = fn.length

 	// deno-lint-ignore no-explicit-any
 	return function curried(...args: any[]): any {
 		if (args.length >= arity) {
 			return fn(...args.slice(0, arity))
 		}
 		// deno-lint-ignore no-explicit-any
 		return (...nextArgs: any[]) => curried(...args, ...nextArgs)
 	}
}

//?? [EXAMPLE] curriedAdd(1)(2)(3) // 6
//?? [EXAMPLE] curriedAdd(1, 2)(3) // 6
//?? [EXAMPLE] curriedAdd(1)(2, 3) // 6
//?? [EXAMPLE] curriedAdd(1, 2, 3) // 6
/*??
 | [EXAMPLE]
 | ```typescript
 | const add = (a: number, b: number, c: number) => a + b + c
 | const curriedAdd = curry(add)
 |
 | curriedAdd(1)(2)(3) // 6
 | curriedAdd(1, 2)(3) // 6
 | curriedAdd(1)(2, 3) // 6
 | curriedAdd(1, 2, 3) // 6
 |
 | const add5 = curriedAdd(5)
 | const add5and10 = add5(10)
 | add5and10(2) // 17
 | ```
 */

export default curry
