import right from "../right/index.ts"

//++ Lifts a value into the Either context as Right (alias of right)
const of = right

export default of

//?? [EXAMPLE] of(42) // right(42)
//?? [EXAMPLE] of({ id: 1 }) // right({ id: 1 })
/*??
 | [NOTE] Alias of right for API consistency across monads
 | [GOTCHA] Either is a general bifunctor; Right conventionally represents success
 | [SEE] ../right/index.ts for details
 */
