import type { Io } from "../../../types/fp/io/index.ts"

//++ Applies an Io function to an Io value (Applicative pattern)
export default function ap<A, B>(ioFunction: Io<(value: A) => B>) {
	return function applyIoFunction(ioValue: Io<A>): Io<B> {
		return function appliedIo() {
			return ioFunction()(ioValue())
		}
	}
}
