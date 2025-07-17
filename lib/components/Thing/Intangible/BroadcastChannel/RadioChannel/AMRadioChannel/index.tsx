import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AMRadioChannelProps from "../../../../../../types/Thing/AMRadioChannel/index.ts"
import type RadioChannelProps from "../../../../../../types/Thing/RadioChannel/index.ts"

import RadioChannel from "../index.tsx"

// AMRadioChannel adds no properties to the RadioChannel schema type
export type Props = BaseComponentProps<
	AMRadioChannelProps,
	"AMRadioChannel",
	ExtractLevelProps<AMRadioChannelProps, RadioChannelProps>
>

export default function AMRadioChannel({
	schemaType = "AMRadioChannel",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<RadioChannel
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
