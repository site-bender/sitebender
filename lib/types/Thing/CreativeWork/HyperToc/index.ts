import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import HyperTocEntryComponent from "../../../../components/Thing/CreativeWork/HyperTocEntry/index.ts"
import MediaObjectComponent from "../../../../components/Thing/MediaObject/index.ts"

export interface HyperTocProps {
	associatedMedia?: MediaObject | ReturnType<typeof MediaObjectComponent>
	tocEntry?: HyperTocEntry | ReturnType<typeof HyperTocEntryComponent>
}

type HyperToc = Thing & CreativeWorkProps & HyperTocProps

export default HyperToc
