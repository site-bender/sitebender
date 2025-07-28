import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { ReturnActionProps } from "../../../../../types/Thing/Action/TransferAction/ReturnAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReturnActionProps,
	"ReturnAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function ReturnAction({
	recipient,
	schemaType = "ReturnAction",
	subtypeProperties = {},
	...props
}): Props {
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
