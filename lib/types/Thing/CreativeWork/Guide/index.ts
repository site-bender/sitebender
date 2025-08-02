import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type GuideType = "Guide"

export interface GuideProps {
	"@type"?: GuideType
	reviewAspect?: Text
}

type Guide = Thing & CreativeWorkProps & GuideProps

export default Guide
