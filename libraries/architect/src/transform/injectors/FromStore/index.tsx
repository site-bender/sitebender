//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { DataType } from "../../../../../artificer/types/ir/index.ts"

export type FromStoreProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: DataType | "String" | "Number" | "Boolean" | "Json"
	defaultValue?: import("../../../../../artificer/types/index.ts").Value
}

type InjectorShape = {
	type: "injector"
	tag: "FromStore"
	datatype?: DataType
	key: string
	defaultValue?: unknown
}

export default function FromStore(
	{ key, type = "String", datatype, defaultValue }: FromStoreProps,
): InjectorShape {
	const dt = (datatype as DataType | undefined) ??
		(type === "Number" ? "Float" : (type as unknown as DataType))
	return {
		type: "injector",
		tag: "FromStore",
		datatype: dt,
		key,
		defaultValue,
	}
}
