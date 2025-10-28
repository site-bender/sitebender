import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HyperTocEntryComponent from "../../../../../../architect/src/define/Thing/CreativeWork/HyperTocEntry/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../../architect/index.tsx"

export type HyperTocType = "HyperToc"

export interface HyperTocProps {
	"@type"?: HyperTocType
	associatedMedia?: MediaObject | ReturnType<typeof MediaObjectComponent>
	tocEntry?: HyperTocEntry | ReturnType<typeof HyperTocEntryComponent>
}

type HyperToc = Thing & CreativeWorkProps & HyperTocProps

export default HyperToc
