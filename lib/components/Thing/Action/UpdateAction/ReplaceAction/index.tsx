import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ReplaceActionProps from "../../../../../types/Thing/ReplaceAction/index.ts"
import type UpdateActionProps from "../../../../../types/Thing/UpdateAction/index.ts"

import UpdateAction from "./index.tsx"

export type Props = BaseComponentProps<
	ReplaceActionProps,
	"ReplaceAction",
	ExtractLevelProps<ReplaceActionProps, UpdateActionProps>
>

export default function ReplaceAction(
	{
		replacee,
		replacer,
		schemaType = "ReplaceAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
