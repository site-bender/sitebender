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


export default curry
