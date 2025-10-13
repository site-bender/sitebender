//++ Main enforcement function
import type {
	EnforcementPhase,
	Violation,
	WardenConfig,
} from "../../types/index.ts"

import validateImports from "../_validateImports/index.ts"
import validateStructure from "../_validateStructure/index.ts"
import flatten from "../../../../toolsmith/src/array/flatten/index.ts"
import isEmpty from "../../../../toolsmith/src/array/isEmpty/index.ts"
import map from "../../../../toolsmith/src/array/map/index.ts"
import parallel from "../../../../toolsmith/src/async/parallel/index.ts"
import validateContract from "../../contracts/validateContract/index.ts"
import validatePrivacy from "../../privacy/validatePrivacy/index.ts"

export default function enforce(config: WardenConfig) {
	return async function enforcePhase(phase: EnforcementPhase = "warn") {
		const startTime = Temporal.Now.instant()

		// Create validation functions for each target
		const createTargetValidator = (target: string) => async () => {
			const targetViolations: Violation[] = []

			// Run all validations concurrently for each target
			// Since validateContract returns a different type, handle them separately
			const [structureValid, privacyValid, importValid, contractValid] =
				await Promise.all([
					validateStructure(target)(),
					validatePrivacy(target)(new Map())(),
					validateImports(target)(new Map())(),
					validateContract(target)(),
				])

			// Structure validation
			if (!structureValid) {
				targetViolations.push({
					type: "structure",
					severity: "high",
					message: `Structure validation failed for ${target}`,
					file: target,
				})
			}

			// Privacy validation (needs usage map - for now use empty map)
			if (!privacyValid) {
				targetViolations.push({
					type: "privacy",
					severity: "high",
					message: `Privacy validation failed for ${target}`,
					file: target,
				})
			}

			// Import validation (needs import map - for now use empty map)
			if (!importValid) {
				targetViolations.push({
					type: "import",
					severity: "medium",
					message: `Import validation failed for ${target}`,
					file: target,
				})
			}

			// Contract validation
			if (!contractValid.success) {
				targetViolations.push({
					type: "contract",
					severity: "medium",
					message: `Contract validation failed for ${target}: ${
						contractValid.errors.join(", ")
					}`,
					file: target,
				})
			}

			return targetViolations
		}

		// Create validation tasks for all targets
		const targetValidationTasks = map(createTargetValidator)(config.targets)

		// Run all target validations concurrently and flatten results
		const allTargetViolations = await parallel(targetValidationTasks)
		const allViolations = flatten(1)(allTargetViolations)

		const endTime = Temporal.Now.instant()
		const executionTime = endTime.since(startTime).total("milliseconds")
		const success = isEmpty(allViolations)

		return {
			success,
			violations: allViolations,
			executionTime,
			phase,
		}
	}
}
