import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { PlayActionProps } from "../../../../../types/Thing/Action/PlayAction/index.ts"
import type { PerformActionProps } from "../../../../../types/Thing/Action/PlayAction/PerformAction/index.ts"

import PlayAction from "../index.tsx"

export type Props = BaseComponentProps<
	PerformActionProps,
	"PerformAction",
	ExtractLevelProps<ThingProps, ActionProps, PlayActionProps>
>

export default function PerformAction({
	entertainmentBusiness,
	schemaType = "PerformAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<PlayAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				entertainmentBusiness,
				...subtypeProperties,
			}}
		/>
	)
}
