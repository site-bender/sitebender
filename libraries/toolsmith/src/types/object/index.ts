//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { Value } from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Transformation<T = Value> = (value: T) => Value

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TransformationSpec = Value | Transformation | TransformationMap

export interface TransformationMap {
	[key: string]: TransformationSpec
}
