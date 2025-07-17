import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type SendActionProps from "../../../../../types/Thing/SendAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	SendActionProps,
	"SendAction",
	ExtractLevelProps<SendActionProps, TransferActionProps>
>

export default function SendAction(
	{
		deliveryMethod,
		recipient,
		schemaType = "SendAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				deliveryMethod,
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
