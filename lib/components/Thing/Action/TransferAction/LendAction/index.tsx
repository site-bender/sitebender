import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { LendActionProps } from "../../../../../types/Thing/Action/TransferAction/LendAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	LendActionProps,
	"LendAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function LendAction({
	borrower,
	schemaType = "LendAction",
	subtypeProperties = {},
	...props
}): Props {
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
