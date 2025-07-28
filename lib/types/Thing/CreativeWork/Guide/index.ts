import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import GuideComponent from "../../../../../components/Thing/CreativeWork/Guide/index.tsx"

export interface GuideProps {
	reviewAspect?: Text
}

type Guide =
	& Thing
	& CreativeWorkProps
	& GuideProps

export default Guide
