import type { Value } from "../../../types/index.ts"

import isUndefined from "../../validation/isUndefined/index.ts"
import path from "../path/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const pathOr =
	<T extends Value>(pathInput: string | Array<string | number>) =>
	(defaultValue: T) =>
	(obj: Value): T | Value => {
		const result = path(pathInput)(obj)
		return isUndefined(result) ? defaultValue : result
	}

export default pathOr
