import type { IoEither } from "../../../types/fp/io/index.ts"

//++ Flat maps a function returning IoEither over the Right value (bind for IoEither, branching logic)
export default function chainIoEither<L, A, B>(
	binder: (value: A) => IoEither<L, B>,
) {
	return function chainOverIoEither(ioEither: IoEither<L, A>): IoEither<L, B> {
		return function chainedIoEither() {
			const either = ioEither()
			//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Either monad tag checking
			return either._tag === "Right" ? binder(either.right)() : either
		}
	}
}
