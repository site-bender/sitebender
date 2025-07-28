import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { ConsumeActionProps } from "../../../../../types/Thing/Action/ConsumeAction/index.ts"
import type { PlayGameActionProps } from "../../../../../types/Thing/Action/ConsumeAction/PlayGameAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = BaseComponentProps<
	PlayGameActionProps,
	"PlayGameAction",
	ExtractLevelProps<ThingProps, ActionProps, ConsumeActionProps>
>

export default function PlayGameAction({
	gameAvailabilityType,
	schemaType = "PlayGameAction",
	subtypeProperties = {},
	...props
}): Props {
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
