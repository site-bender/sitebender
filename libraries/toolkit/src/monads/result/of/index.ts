import ok from "../ok/index.ts"

//++ Lifts a value into the Result context as Ok (alias of ok)
const of = ok

export default of

//?? [EXAMPLE] of(42) // ok(42)
//?? [EXAMPLE] of({ id: 1 }) // ok({ id: 1 })
//?? [NOTE] Alias of ok for API consistency across monads
//?? [SEE] ../ok/index.ts for details
