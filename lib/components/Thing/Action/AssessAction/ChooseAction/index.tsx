import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { AssessActionProps } from "../../../../../types/Thing/Action/AssessAction/index.ts"
import type { ChooseActionProps } from "../../../../../types/Thing/Action/AssessAction/ChooseAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = BaseComponentProps<
	ChooseActionProps,
	"ChooseAction",
	ExtractLevelProps<ThingProps, ActionProps, AssessActionProps>
>

export default function ChooseAction({
	actionOption,
	option,
	schemaType = "ChooseAction",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<AssessAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				actionOption,
				option,
				...subtypeProperties,
			}}
		/>
	)
}
