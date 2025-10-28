import type { Value } from "../index.ts"

export type Transformation<T = Value> = (value: T) => Value

export type TransformationSpec = Value | Transformation | TransformationMap
export type TransformationMap = {
	[key: string]: TransformationSpec
}
