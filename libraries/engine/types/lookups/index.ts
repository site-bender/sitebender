import type { JsonValue } from "../json/index.ts"

export type LookupConfig = {
	readonly tag: "Data"
	readonly attributes: {
		readonly class: "lookup"
		readonly id: string
		readonly value: JsonValue
	}
	readonly dataset: {
		readonly type: string
	}
}

export type LookupTableConfig = {
	readonly tag: "Data"
	readonly attributes: {
		readonly class: "lookup-table"
		readonly id: string
		readonly value: JsonValue // TODO(@chasm): add type for table
	}
	readonly dataset: {
		readonly type: string
	}
}
