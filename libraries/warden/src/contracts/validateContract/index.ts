//++ Validate contract against implementation
import schemaValidator from "../_schemaValidator/index.ts"
import filter from "../../../../toolsmith/src/vanilla/array/filter/index.ts"
import isEmpty from "../../../../toolsmith/src/vanilla/array/isEmpty/index.ts"

//++ Curried validation function that accepts contract path and returns validation result
export default function validateContract(contractPath: string) {
	return async function () {
		try {
			// For Phase 1.1, implement basic contract validation
			// Read and parse the contract file
			const contractContent = await Deno.readTextFile(contractPath)
			const contract = JSON.parse(contractContent)

			// Build errors array using proper functional composition
			const errors = filter((x: string | false) => Boolean(x))([
				!contract.version && "Contract missing required 'version' field",
				!contract.library && "Contract missing required 'library' field",
				!(contract.api && contract.api.exports) &&
				"Contract missing required 'api.exports' field",
			])

			// Build warnings array using proper functional composition
			const warnings = filter((x: string | false) => Boolean(x))([
				!contract.privacy &&
				"Contract missing 'privacy' field - privacy rules will not be enforced",
				!contract.implementation &&
				"Contract missing 'implementation' field - implementation constraints will not be enforced",
			])

			// Use schema validator for additional validation
			const schemaValid = await schemaValidator(contract)({})()

			const allErrors = filter((x: string | false) => Boolean(x))([
				...errors,
				!schemaValid && "Contract does not match expected schema",
			])

			return {
				success: isEmpty(allErrors),
				errors: allErrors,
				warnings,
			}
		} catch (error) {
			const errorMessage = error instanceof Error
				? error.message
				: String(error)
			return {
				success: false,
				errors: [`Failed to validate contract: ${errorMessage}`],
				warnings: [],
			}
		}
	}
}
