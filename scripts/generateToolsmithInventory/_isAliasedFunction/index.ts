import includes from "@sitebender/toolsmith/vanilla/string/includes/index.ts"

/**
 * Check if content represents an aliased function (re-export)
 */
export default function _isAliasedFunction(content: string): boolean {
	return includes("export { default } from")(content)
}
