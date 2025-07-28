import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

import TelevisionChannelComponent from "../../../../../../components/Thing/Intangible/BroadcastChannel/TelevisionChannel/index.tsx"

export interface TelevisionChannelProps {
}

type TelevisionChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& TelevisionChannelProps

export default TelevisionChannel
