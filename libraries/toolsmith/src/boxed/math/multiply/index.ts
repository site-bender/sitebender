import vanillaMultiply from "../../../vanilla/math/multiply/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of multiply that works with Result/Validation monads
//++ Defaults to Result for plain values, Validation if any input is Validation
const multiply = liftBinary(vanillaMultiply)
export default multiply

//?? [EXAMPLE] multiply(5)(10) // Result.Ok(50)
//?? [EXAMPLE] multiply(ok(5))(10) // Result.Ok(50)
//?? [EXAMPLE] multiply(success(5))(10) // Validation.Valid(50)

/*??
 | [EXAMPLE]
 | import multiply from "@toolsmith/boxed/math/multiply"
 | import ok from "@toolsmith/monads/result/ok"
 | import error from "@toolsmith/monads/result/error"
 | import success from "@toolsmith/monads/validation/success"
 | import failure from "@toolsmith/monads/validation/failure"
 |
 | // Plain values default to Result
 | multiply(2)(3) // {_tag: "Ok", value: 6}
 |
 | // Result propagation
 | multiply(ok(2))(ok(3)) // {_tag: "Ok", value: 6}
 | multiply(error("bad input"))(ok(3)) // {_tag: "Error", error: "bad input"}
 | multiply(ok(2))(error("bad input")) // {_tag: "Error", error: "bad input"}
 |
 | // Validation propagation (and accumulation)
 | multiply(success(2))(success(3)) // {_tag: "Valid", value: 6}
 | multiply(failure(["error1"]))(success(3)) // {_tag: "Invalid", errors: ["error1"]}
 | multiply(failure(["error1"]))(failure(["error2"]))
 | // {_tag: "Invalid", errors: ["error1", "error2"]}
 |
 | // Validation "wins" over Result
 | multiply(ok(2))(success(3)) // {_tag: "Valid", value: 6}
 | multiply(success(2))(ok(3)) // {_tag: "Valid", value: 6}
 |
 | // Use in pipes
 | pipe(
 |   10,
 |   multiply(5),      // Result.Ok(50)
 |   multiply(2)       // Result.Ok(100)
 | )
 |
 | pipe(
 |   success(10),
 |   multiply(5),      // Validation.Valid(50)
 |   multiply(2)       // Validation.Valid(100)
 | )
 |
 | // Combine with other boxed functions
 | pipe(
 |   success(10),
 |   add(5),          // Validation.Valid(15)
 |   multiply(2),     // Validation.Valid(30)
 |   add(3)           // Validation.Valid(33)
 | )
 |
 | [PRO] Same interface as vanilla multiply, just boxed
 | [PRO] Automatic monad selection based on input
 | [PRO] Composes naturally with other boxed functions
 | [PRO] No cognitive overhead - just use it
 |
 | [GOTCHA] Return type depends on input types
 | [GOTCHA] Validation propagates through entire chain
 */
