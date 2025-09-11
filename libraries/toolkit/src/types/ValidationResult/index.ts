import type { Validation } from "../Validation/index.ts"
import type ValidationError from "../ValidationError/index.ts"

//++ Specialized validation type that uses ValidationError for errors
export type ValidationResult<A> = Validation<ValidationError, A>
