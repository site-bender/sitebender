import at from "@sitebender/toolsmith/array/at/index.ts"
import slice from "@sitebender/toolsmith/array/slice/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

import type { Paths } from "../index.ts"

export default function removeMatchingSegments({ from, to }: Paths): Paths {
	return isEqual(at(0)(from))(at(0)(to))
		? {
			from: slice(1)()(from),
			to: slice(1)()(to),
		}
		: { from, to }
}
