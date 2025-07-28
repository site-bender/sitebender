import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../types/Thing/Action/index.ts"
import type { PlayActionProps } from "../../../../types/Thing/Action/PlayAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	PlayActionProps,
	"PlayAction",
	ExtractLevelProps<ThingProps, ActionProps>
>

export default function PlayAction({
	audience,
	event,
	schemaType = "PlayAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				audience,
				event,
				...subtypeProperties,
			}}
		/>
	)
}
