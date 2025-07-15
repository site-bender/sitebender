import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FMRadioChannelProps from "../../../../../../types/Thing/FMRadioChannel/index.ts"
import type RadioChannelProps from "../../../../../../types/Thing/RadioChannel/index.ts"

import RadioChannel from "./index.tsx"

// FMRadioChannel adds no properties to the RadioChannel schema type
export type Props = BaseComponentProps<
	FMRadioChannelProps,
	"FMRadioChannel",
	ExtractLevelProps<FMRadioChannelProps, RadioChannelProps>
>

export default function FMRadioChannel({
	schemaType = "FMRadioChannel",
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
