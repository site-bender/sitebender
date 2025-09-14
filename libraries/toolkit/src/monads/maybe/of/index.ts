import just from "../just/index.ts"

//++ Lifts a value into the Maybe context (alias of just)
const of = just

export default of

//?? [EXAMPLE] of(42) // Just(42)
//?? [EXAMPLE] of({ id: 1 }) // Just({ id: 1 })
/*??
 | [NOTE] Alias of just for API consistency across monads
 | [SEE] ../just/index.ts for details
 */
