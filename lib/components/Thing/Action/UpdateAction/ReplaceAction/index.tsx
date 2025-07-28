import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { UpdateActionProps } from "../../../../../types/Thing/Action/UpdateAction/index.ts"
import type { ReplaceActionProps } from "../../../../../types/Thing/Action/UpdateAction/ReplaceAction/index.ts"

import UpdateAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReplaceActionProps,
	"ReplaceAction",
	ExtractLevelProps<ThingProps, ActionProps, UpdateActionProps>
>

export default function ReplaceAction({
	replacee,
	replacer,
	schemaType = "ReplaceAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<UpdateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				replacee,
				replacer,
				...subtypeProperties,
			}}
		/>
	)
}
