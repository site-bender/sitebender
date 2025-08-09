import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromLookupTable = (datatype = "Json") => (config = {}) => {
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
