import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HyperTocEntryComponent from "../../../../components/Thing/CreativeWork/HyperTocEntry/index.ts"
import MediaObjectComponent from "../../../../components/Thing/MediaObject/index.ts"

export type HyperTocEntryType = "HyperTocEntry"

export interface HyperTocEntryProps {
	"@type"?: HyperTocEntryType
	associatedMedia?: MediaObject | ReturnType<typeof MediaObjectComponent>
	tocContinuation?: HyperTocEntry | ReturnType<typeof HyperTocEntryComponent>
	utterances?: Text
}

type HyperTocEntry = Thing & CreativeWorkProps & HyperTocEntryProps

export default HyperTocEntry
