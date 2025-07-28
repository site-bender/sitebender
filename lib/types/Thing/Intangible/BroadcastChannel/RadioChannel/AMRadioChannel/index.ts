import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { BroadcastChannelProps } from "../../index.ts"
import type { RadioChannelProps } from "../index.ts"

import AMRadioChannelComponent from "../../../../../../../components/Thing/Intangible/BroadcastChannel/RadioChannel/AMRadioChannel/index.tsx"

export interface AMRadioChannelProps {
}

type AMRadioChannel =
	& Thing
	& IntangibleProps
	& BroadcastChannelProps
	& RadioChannelProps
	& AMRadioChannelProps

export default AMRadioChannel
