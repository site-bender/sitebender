import valid from "../valid/index.ts"

//++ Lifts a value into the Validation context as Valid (alias of valid)
const of = valid

export default of

//?? [EXAMPLE] of(42) // valid(42)
//?? [EXAMPLE] of({ id: 1 }) // valid({ id: 1 })
/*??
 | [NOTE] Alias of valid for API consistency across monads
 | [SEE] ../valid/index.ts for details
 */
