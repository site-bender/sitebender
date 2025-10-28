//++ List of all potential rules JSON file locations in the project
export const RULES_FILE_LOCATIONS = [
	"rules/index.json",
	"applications/rules/index.json",
	"libraries/architect/rules/index.json",
	"libraries/artificer/rules/index.json",
	"libraries/toolsmith/rules/index.json",
	"libraries/quarrier/rules/index.json",
	"libraries/auditor/rules/index.json",
	"libraries/envoy/rules/index.json",
	"libraries/arborist/rules/index.json",
	"libraries/formulator/rules/index.json",
	"libraries/agent/rules/index.json",
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
