import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BroadcastServiceProps from "../../../../../../types/Thing/BroadcastService/index.ts"
import type RadioBroadcastServiceProps from "../../../../../../types/Thing/RadioBroadcastService/index.ts"

import BroadcastService from "../index.tsx"

// RadioBroadcastService adds no properties to the BroadcastService schema type
export type Props = BaseComponentProps<
	RadioBroadcastServiceProps,
	"RadioBroadcastService",
	ExtractLevelProps<RadioBroadcastServiceProps, BroadcastServiceProps>
>

export default function RadioBroadcastService({
	schemaType = "RadioBroadcastService",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<BroadcastService
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
