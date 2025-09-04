import type { IOEither } from "../../types/fp/io/index.ts"

/**
 * Flat maps a function returning IOEither over the success value of an IOEither
 *
 * This is the monadic bind operation for IOEither, allowing you to chain
 * computations that may have side effects and may fail. If the IOEither contains
 * a Right value, the function is applied to produce a new IOEither. If it contains
 * a Left value (error), the function is skipped and the error is preserved.
 * This enables building complex pipelines of potentially failing effectful
 * computations while handling errors gracefully.
 *
 * @curried (f) => (io) => chainedIO
 * @param f - Function that takes a success value and returns a new IOEither
 * @param io - IOEither to chain from
 * @returns New IOEither representing the chained computation
 * @example
 * ```typescript
 * // Chain successful IOEither operations
 * const getUserIO = (id: number) =>
 *   ioEither(() =>
 *     id === 1
 *       ? right({ id: 1, name: "Alice" })
 *       : left("User not found")
 *   )
 *
 * const getProfileIO = (user: { name: string }) =>
 *   ioEither(() => right(`Profile for ${user.name}`))
 *
 * const profileIO = chainIOEither(getProfileIO)(getUserIO(1))
 * runIO(profileIO)  // Right("Profile for Alice")
 *
 * // Error short-circuits
 * const failedIO = chainIOEither(getProfileIO)(getUserIO(99))
 * runIO(failedIO)  // Left("User not found")
 *
 * // Multiple validation steps
 * const validateEmailIO = (email: string) =>
 *   ioEither(() =>
 *     email.includes("@")
 *       ? right(email)
 *       : left("Invalid email")
 *   )
 *
 * const normalizeEmailIO = (email: string) =>
 *   ioEither(() => right(email.toLowerCase()))
 *
 * const emailChainIO = chainIOEither(normalizeEmailIO)(
 *   validateEmailIO("USER@EXAMPLE.COM")
 * )
 * runIO(emailChainIO)  // Right("user@example.com")
 * ```
 * @pure
 * @curried
 */
const chainIOEither =
	<E, A, B>(f: (a: A) => IOEither<E, B>) =>
	(io: IOEither<E, A>): IOEither<E, B> =>
	() => {
		const either = io()
		return either._tag === "Right" ? f(either.right)() : either
	}

export default chainIOEither
