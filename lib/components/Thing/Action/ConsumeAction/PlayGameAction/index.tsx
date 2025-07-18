import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type PlayGameActionProps from "../../../../../types/Thing/PlayGameAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = BaseComponentProps<
	PlayGameActionProps,
	"PlayGameAction",
	ExtractLevelProps<PlayGameActionProps, ConsumeActionProps>
>

export default function PlayGameAction(
	{
		gameAvailabilityType,
		schemaType = "PlayGameAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<ConsumeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				gameAvailabilityType,
				...subtypeProperties,
			}}
		/>
	)
}
