/**
 * From.Store JSX Marker (no-op lowering initially)
 *
 * Represents ephemeral program/UI state lookup.
 * For now we just emit a recognizable injector-shaped object for the IR pass
 * to pattern match later.
 */

import type { DataType } from "@adaptiveTypes/ir/index.ts"

export type FromStoreProps = {
	key: string
	type?: "String" | "Number" | "Boolean" | "Json"
	datatype?: DataType | "String" | "Number" | "Boolean" | "Json"
	defaultValue?: import("@adaptiveTypes/index.ts").Value
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
	return { type: "injector", tag: "FromStore", datatype: dt, key, defaultValue }
}
