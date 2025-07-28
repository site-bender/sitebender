import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MediaObject from "../../MediaObject/index.ts"

import HyperTocEntryComponent from "../../../../../components/Thing/CreativeWork/HyperTocEntry/index.tsx"

export interface HyperTocEntryProps {
	associatedMedia?: MediaObject
	tocContinuation?: HyperTocEntry
	utterances?: Text
}

type HyperTocEntry =
	& Thing
	& CreativeWorkProps
	& HyperTocEntryProps

export default HyperTocEntry
