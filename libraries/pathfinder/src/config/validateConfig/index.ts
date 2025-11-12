import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import type NonEmptyArray from "@sitebender/toolsmith/types/NonEmptyArray/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import betweenInclusive from "@sitebender/toolsmith/validation/betweenInclusive/index.ts"
import isNotEmpty from "@sitebender/toolsmith/array/isNotEmpty/index.ts"
import type { ConfigError } from "../../types/index.ts"
import type { PathfinderConfig, ValidPathfinderConfig } from "../types/index.ts"

export default function validateConfig(
	config: PathfinderConfig,
): Validation<ConfigError, ValidPathfinderConfig> {
	// Build errors array immutably
	const tripleStoreHostError: ReadonlyArray<ConfigError> = or(
			not(config.tripleStore.host),
		)(isEqual("")(config.tripleStore.host.trim()))
		? [{
			_tag: "ConfigError",
			kind: "MissingHost",
			field: "tripleStore.host",
			message: "Triple store host is required",
		}]
		: []

	const tripleStorePort = config.tripleStore.port
	const tripleStorePortError: ReadonlyArray<ConfigError> = or(
			not(tripleStorePort),
		)(not(betweenInclusive(1)(65535)(tripleStorePort)))
		? [{
			_tag: "ConfigError",
			kind: "InvalidPort",
			field: "tripleStore.port",
			message: `Port must be between 1 and 65535, got ${tripleStorePort}`,
			value: tripleStorePort,
		}]
		: []

	const vectorStoreHostError: ReadonlyArray<ConfigError> = or(
			not(config.vectorStore.host),
		)(isEqual("")(config.vectorStore.host.trim()))
		? [{
			_tag: "ConfigError",
			kind: "MissingHost",
			field: "vectorStore.host",
			message: "Vector store host is required",
		}]
		: []

	const vectorStorePort = config.vectorStore.port
	const vectorStorePortError: ReadonlyArray<ConfigError> = or(
			not(vectorStorePort),
		)(not(betweenInclusive(1)(65535)(vectorStorePort)))
		? [{
			_tag: "ConfigError",
			kind: "InvalidPort",
			field: "vectorStore.port",
			message: `Port must be between 1 and 65535, got ${vectorStorePort}`,
			value: vectorStorePort,
		}]
		: []

	// Combine all errors immutably
	const errors = [
		...tripleStoreHostError,
		...tripleStorePortError,
		...vectorStoreHostError,
		...vectorStorePortError,
	]

	// Return failure if any errors, otherwise success with brand
	return isNotEmpty(errors)
		? failure(errors as NonEmptyArray<ConfigError>)
		: success(config as ValidPathfinderConfig)
}
