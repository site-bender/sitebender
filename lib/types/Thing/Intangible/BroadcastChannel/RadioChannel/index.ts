import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { BroadcastChannelProps } from "../index.ts"

import RadioChannelComponent from "../../../../../../components/Thing/Intangible/BroadcastChannel/RadioChannel/index.tsx"

export interface RadioChannelProps {
}

type RadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps

export default RadioChannel
