const FromLookupTable =
	(datatype = "Json") =>
	(config = {}) => {
		const { column, tableName, test } = config

		return {
			column,
			datatype,
			source: { class: "lookup-table", name: tableName },
			test,
			tag: "FromLookupTable",
		}
	}

export default FromLookupTable
