import type { Either, Right } from "../../../types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Right branch value
export default function isRight<E, A>(
	either: Either<E, A>,
): either is Right<A> {
	/*++
	 + [EXCEPTION] Uses === operator and property access to check discriminated union tag
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return either._tag === "Right"
}
