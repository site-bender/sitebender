//++ Transparently executes a side effect without affecting the monadic value
export default function tap<A>(sideEffect: (value: A) => void) {
	return function executeWithValue(value: A): A {
		sideEffect(value)
		return value
	}
}

//?? [EXAMPLE] tap(console.log)(42) // logs 42, returns 42
//?? [EXAMPLE] tap(x => localStorage.setItem('value', x))('data') // saves 'data', returns 'data'
//?? [EXAMPLE] pipe(getValue(), tap(logDebug), processValue) // logs intermediate value
/*??
 | [EXAMPLE]
 | const debugTap = tap(x => console.log('Debug:', x))
 | const result = pipe(
 |   fetchData(),
 |   tap(x => console.log('Fetched:', x)),
 |   transform,
 |   tap(x => console.log('Transformed:', x)),
 |   validate
 | )
 |
 | // In monadic context
 | const computation = doNotation(Maybe)(function* () {
 |   const x = yield Some(5)
 |   tap(console.log)(x)  // Side effect: logs 5
 |   return x * 2         // Returns 10
 | })
 |
 | [GOTCHA] Side effect function must not throw - wrap in try/catch if needed
 | [GOTCHA] Return value of side effect is ignored
 | [PRO] Enables debugging without modifying data flow
 | [PRO] Perfect for logging, metrics, caching
 |
*/
