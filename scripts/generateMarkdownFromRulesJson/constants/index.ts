//++ List of all potential rules JSON file locations in the project
export const RULES_FILE_LOCATIONS = [
	"rules/index.json",
	"applications/rules/index.json",
	"libraries/components/rules/index.json",
	"libraries/engine/rules/index.json",
	"libraries/toolkit/rules/index.json",
	"libraries/foundry/rules/index.json",
	"libraries/prover/rules/index.json",
	"libraries/envoy/rules/index.json",
	"libraries/parser/rules/index.json",
	"libraries/maths/rules/index.json",
	"libraries/mesh/rules/index.json",
]

//++ List of keys that are considered metadata in rules JSON files
export const METADATA_KEYS = [
	"version",
	"lastUpdated",
	"author",
	"scope",
	"description",
	"inherits",
]
