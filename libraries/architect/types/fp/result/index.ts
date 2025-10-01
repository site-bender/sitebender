import type { Either, Left, Right } from "../either/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Result<T, E> = Either<E, T>
export type Ok<T> = Right<T>
export type Err<E> = Left<E>
