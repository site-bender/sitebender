import type { IoValidation } from "../../../types/fp/io/index.ts"

import success from "../../validation/success/index.ts"

//++ Maps a function over the Success value inside IoValidation (error accumulation)
export default function mapIoValidation<E, A, B>(mapper: (value: A) => B) {
	return function mapOverIoValidation(
		ioValidation: IoValidation<E, A>,
	): IoValidation<E, B> {
		return function mappedIoValidation() {
			const validation = ioValidation()
			return validation._tag === "Success"
				? success(mapper(validation.value))
				: validation
		}
	}
}
