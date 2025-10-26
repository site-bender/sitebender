import type { Io, IoValidation } from "../../../types/fp/io/index.ts"

import success from "../../validation/success/index.ts"

//++ Converts Io<A> to IoValidation<E, A> by wrapping the value in Success (error accumulation)
export default function ioToIoValidation<E, A>(io: Io<A>): IoValidation<E, A> {
	return function ioValidationFromIo() {
		return success(io())
	}
}
