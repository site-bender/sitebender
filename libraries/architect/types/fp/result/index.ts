import type { Either, Left, Right } from "../either/index.ts"

/**
 * Result type as an alias for Either with more intuitive naming
 * Ok represents success (Right), Err represents failure (Left)
 */
export type Result<T, E> = Either<E, T>
export type Ok<T> = Right<T>
export type Err<E> = Left<E>
