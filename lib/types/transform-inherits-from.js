function transformInheritsFrom(typeList) {
	for (const [typeName, typeData] of Object.entries(typeList)) {
		if (typeData.inheritsFrom && Array.isArray(typeData.inheritsFrom)) {
			const inheritsFromObject = {}
			for (const ancestorType of typeData.inheritsFrom) {
				if (typeList[ancestorType]) {
					inheritsFromObject[ancestorType] = typeList[ancestorType].location
				}
			}
			typeData.inheritsFrom = inheritsFromObject
		}
	}
	return typeList
}

// Read the input file
const typeList = JSON.parse(Deno.readTextFileSync("paths-final.json"))

// Transform the data
const transformedTypeList = transformInheritsFrom(typeList)

// Write the output file
Deno.writeTextFileSync(
	"paths-final-almost.json",
	JSON.stringify(transformedTypeList, null, 2),
)

console.log(
	"Transformation complete. Output written to paths-final-almost.json",
)
