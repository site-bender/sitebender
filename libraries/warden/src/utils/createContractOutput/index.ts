import type { ContractMetadata, ContractOutput } from "../../types/enforcement.ts"

import { DEFAULT_HASH_ALGORITHM, HASH_VERSION } from "../../constants/index.ts"

import hashHex from "../../../../toolsmith/src/crypto/hashHex/index.ts"
import deepFreeze from "../deepFreeze/index.ts"
import generateLegacyChecksum from "../generateLegacyChecksum/index.ts"
import validateContract from "./validateContract/index.ts"
import canonicalStringify from "../canonicalStringify/index.ts"

//++ Creates an immutable contract output with validation and metadata

export default async function createContractOutput<T>(
	data: T,
	library: string,
	version: string,
): Promise<ContractOutput<T>> {
	const timestamp = Date.now()
	const frozenData = deepFreeze(structuredClone(data))

	const dataJson = canonicalStringify(frozenData)
	const hash = await hashHex(dataJson)
	const legacyChecksum = generateLegacyChecksum(dataJson)

	const metadata: ContractMetadata = Object.freeze({
		library,
		version,
		timestamp,
		checksum: legacyChecksum,
		hashAlgo: DEFAULT_HASH_ALGORITHM,
		hashVersion: HASH_VERSION,
		hash,
		frozen: true,
	})

	return Object.freeze({
		data: frozenData,
		metadata,
		validate: () => validateContract(frozenData, library, hash),
	})
}
