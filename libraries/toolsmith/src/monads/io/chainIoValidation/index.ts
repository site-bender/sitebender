import type { IoValidation } from "../../../types/fp/io/index.ts"

//++ Flat maps a function returning IoValidation over the Success value (bind for IoValidation, error accumulation)
export default function chainIoValidation<E, A, B>(
	binder: (value: A) => IoValidation<E, B>,
) {
	return function chainOverIoValidation(
		ioValidation: IoValidation<E, A>,
	): IoValidation<E, B> {
		return function chainedIoValidation() {
			const validation = ioValidation()
			return validation._tag === "Success" ? binder(validation.value)() : validation
		}
	}
}
