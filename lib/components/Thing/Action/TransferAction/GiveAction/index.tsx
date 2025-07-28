import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { TransferActionProps } from "../../../../../types/Thing/Action/TransferAction/index.ts"
import type { GiveActionProps } from "../../../../../types/Thing/Action/TransferAction/GiveAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = BaseComponentProps<
	GiveActionProps,
	"GiveAction",
	ExtractLevelProps<ThingProps, ActionProps, TransferActionProps>
>

export default function GiveAction({
	recipient,
	schemaType = "GiveAction",
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
