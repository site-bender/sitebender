import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReturnActionProps from "../../../../../types/Thing/ReturnAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReturnActionProps,
	"ReturnAction",
	ExtractLevelProps<ReturnActionProps, TransferActionProps>
>

export default function ReturnAction(
	{
		recipient,
		schemaType = "ReturnAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
