const FromLookupTable =
	(datatype = "Json") =>
	(config = {}) => {
		const { column, local = "local", tableName, test } = config

		return {
			column,
			datatype,
			source: { class: "lookup-table", local, name: tableName },
			test,
			tag: "FromLookupTable",
		}
	}

export default FromLookupTable
