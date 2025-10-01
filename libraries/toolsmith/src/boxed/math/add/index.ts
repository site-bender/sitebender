import vanillaAdd from "../../../vanilla/math/add/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of add that works with Result/Validation monads
//++ Defaults to Result for plain values, Validation if any input is Validation
const add = liftBinary(vanillaAdd)
export default add

//?? [EXAMPLE] add(5)(10) // Result.Ok(15)
//?? [EXAMPLE] add(ok(5))(10) // Result.Ok(15)
//?? [EXAMPLE] add(success(5))(10) // Validation.Valid(15)

/*??
 | [EXAMPLE]
 | import add from "@toolsmith/boxed/math/add"
 | import ok from "@toolsmith/monads/result/ok"
 | import error from "@toolsmith/monads/result/error"
 | import success from "@toolsmith/monads/validation/success"
 | import failure from "@toolsmith/monads/validation/failure"
 |
 | // Plain values default to Result
 | add(2)(3) // {_tag: "Ok", value: 5}
 |
 | // Result propagation
 | add(ok(2))(ok(3)) // {_tag: "Ok", value: 5}
 | add(error("bad input"))(ok(3)) // {_tag: "Error", error: "bad input"}
 | add(ok(2))(error("bad input")) // {_tag: "Error", error: "bad input"}
 |
 | // Validation propagation (and accumulation)
 | add(success(2))(success(3)) // {_tag: "Valid", value: 5}
 | add(failure(["error1"]))(success(3)) // {_tag: "Invalid", errors: ["error1"]}
 | add(failure(["error1"]))(failure(["error2"]))
 | // {_tag: "Invalid", errors: ["error1", "error2"]}
 |
 | // Validation "wins" over Result
 | add(ok(2))(success(3)) // {_tag: "Valid", value: 5}
 | add(success(2))(ok(3)) // {_tag: "Valid", value: 5}
 |
 | // Use in pipes
 | pipe(
 |   10,
 |   add(5),      // Result.Ok(15)
 |   add(3)       // Result.Ok(18)
 | )
 |
 | pipe(
 |   success(10),
 |   add(5),      // Validation.Valid(15)
 |   add(3)       // Validation.Valid(18)
 | )
 |
 | [PRO] Same interface as vanilla add, just boxed
 | [PRO] Automatic monad selection based on input
 | [PRO] Works seamlessly in functional pipelines
 | [PRO] No cognitive overhead - just use it
 |
 | [GOTCHA] Return type depends on input types
 | [GOTCHA] Validation propagates through entire chain
 */
