import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type TakeActionProps from "../../../../../types/Thing/TakeAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "./index.tsx"

// TakeAction adds no properties to the TransferAction schema type
export type Props = BaseComponentProps<
	TakeActionProps,
	"TakeAction",
	ExtractLevelProps<TakeActionProps, TransferActionProps>
>

export default function TakeAction({
	schemaType = "TakeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
