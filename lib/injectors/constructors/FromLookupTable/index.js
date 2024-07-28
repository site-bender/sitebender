const FromLookupTable =
	(datatype = "Json") =>
	(config = {}) => {
		const { column, tableId, test } = config

		return {
			column,
			datatype,
			source: { class: "lookup-table", id: tableId },
			test,
			tag: "FromLookupTable",
		}
	}

export default FromLookupTable
