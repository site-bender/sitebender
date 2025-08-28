import type { ComplexDatatype, FromLookupTableInjector, Operand } from "@adaptiveTypes/index.ts"

import { OPERAND_TYPES } from "@adaptiveSrc/constructors/constants/index.ts"

interface LookupTableConfig {
	column: string
	local?: string
	tableName: string
	test: Operand
}

const FromLookupTable =
	(datatype: ComplexDatatype = "Json") =>
	(config: LookupTableConfig): FromLookupTableInjector => {
		const { column, local = "local", tableName, test } = config

		return {
			tag: "FromLookupTable",
			type: OPERAND_TYPES.injector,
			column,
			datatype,
			source: { class: "lookup-table", local, name: tableName },
			test,
		}
	}

export default FromLookupTable
