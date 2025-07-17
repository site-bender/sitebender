import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AssessActionProps from "../../../../../types/Thing/AssessAction/index.ts"
import type ChooseActionProps from "../../../../../types/Thing/ChooseAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = BaseComponentProps<
	ChooseActionProps,
	"ChooseAction",
	ExtractLevelProps<ChooseActionProps, AssessActionProps>
>

export default function ChooseAction(
	{
		actionOption,
		option,
		schemaType = "ChooseAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
