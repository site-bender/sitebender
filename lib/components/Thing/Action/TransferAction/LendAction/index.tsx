import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LendActionProps from "../../../../../types/Thing/LendAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	LendActionProps,
	"LendAction",
	ExtractLevelProps<LendActionProps, TransferActionProps>
>

export default function LendAction(
	{
		borrower,
		schemaType = "LendAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				borrower,
				...subtypeProperties,
			}}
		/>
	)
}
