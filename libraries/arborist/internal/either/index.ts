//++ Either monad constructors for Result type
export { default as Left } from "./Left/index.ts"
export { default as Right } from "./Right/index.ts"

//?? [EXAMPLE] import { Right, Left } from "./either"
//?? [EXAMPLE] const success = Right(42)
//?? [EXAMPLE] const failure = Left("Error")
