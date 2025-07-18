import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type UpdateActionProps from "../../../../types/Thing/UpdateAction/index.ts"

import Action from "../index.tsx"

export type Props = BaseComponentProps<
	UpdateActionProps,
	"UpdateAction",
	ExtractLevelProps<UpdateActionProps, ActionProps>
>

export default function UpdateAction(
	{
		collection,
		targetCollection,
		schemaType = "UpdateAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				collection,
				targetCollection,
				...subtypeProperties,
			}}
		/>
	)
}
