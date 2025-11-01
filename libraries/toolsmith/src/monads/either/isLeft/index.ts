import type { Either, Left } from "../../../types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Left branch value
export default function isLeft<E, A>(either: Either<E, A>): either is Left<E> {
	//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Either monad type guard
	return either._tag === "Left"
}
