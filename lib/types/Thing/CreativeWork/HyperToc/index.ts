import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type HyperTocEntry from "../HyperTocEntry/index.ts"
import type MediaObject from "../../MediaObject/index.ts"

import HyperTocComponent from "../../../../../components/Thing/CreativeWork/HyperToc/index.tsx"

export interface HyperTocProps {
	associatedMedia?: MediaObject
	tocEntry?: HyperTocEntry
}

type HyperToc =
	& Thing
	& CreativeWorkProps
	& HyperTocProps

export default HyperToc
