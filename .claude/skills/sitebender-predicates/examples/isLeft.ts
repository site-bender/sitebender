import type { Either, Left } from "@sitebender/toolsmith/types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Left branch value
export default function isLeft<E, A>(either: Either<E, A>): either is Left<E> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return either._tag === "Left"
}
