import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HyperTocEntryComponent from "../../../../../src/define/Thing/CreativeWork/HyperTocEntry/index.tsx"
import MediaObjectComponent from "../../../../../src/define/Thing/CreativeWork/MediaObject/index.tsx"

export type HyperTocEntryType = "HyperTocEntry"

export interface HyperTocEntryProps {
	"@type"?: HyperTocEntryType
	associatedMedia?: MediaObject | ReturnType<typeof MediaObjectComponent>
	tocContinuation?: HyperTocEntry | ReturnType<typeof HyperTocEntryComponent>
	utterances?: Text
}

type HyperTocEntry = Thing & CreativeWorkProps & HyperTocEntryProps

export default HyperTocEntry
