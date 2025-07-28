import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import WebContentComponent from "../../../../../components/Thing/CreativeWork/WebContent/index.tsx"

export interface WebContentProps {
}

type WebContent =
	& Thing
	& CreativeWorkProps
	& WebContentProps

export default WebContent
