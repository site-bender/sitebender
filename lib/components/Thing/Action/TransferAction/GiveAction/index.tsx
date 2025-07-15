import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type GiveActionProps from "../../../../../types/Thing/GiveAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "./index.tsx"

export type Props = BaseComponentProps<
	GiveActionProps,
	"GiveAction",
	ExtractLevelProps<GiveActionProps, TransferActionProps>
>

export default function GiveAction(
	{
		recipient,
		schemaType = "GiveAction",
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
