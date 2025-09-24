import type { Maybe } from "../../../types/fp/maybe/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import nothing from "../nothing/index.ts"

//++ Creates a Nothing value with enhanced debugging output for better console logging
export default function nothingWithInspect<A = never>(): Maybe<A> {
	return withInspect(
		nothing<A>(),
		() => "Nothing",
	)
}

//?? [EXAMPLE] nothingWithInspect() // Nothing (enhanced display)
//?? [EXAMPLE] [justWithInspect(1), nothingWithInspect(), justWithInspect(2)] // [ Just(1), Nothing, Just(2) ]
/*??
 | [EXAMPLE]
 | const safeDivide = (a: number) => (b: number) =>
 |   b === 0 ? nothingWithInspect() : justWithInspect(a / b)
 | console.log(safeDivide(10)(2))   // Just(5)
 | console.log(safeDivide(10)(0))   // Nothing
 |
 | [PRO] Superior developer experience when debugging Maybe values
 | [GOTCHA] Adds inspection method which is impure - use regular nothing() for pure FP
 |
*/
