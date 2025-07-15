import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AllocateActionProps from "../../../../../../types/Thing/AllocateAction/index.ts"
import type AuthorizeActionProps from "../../../../../../types/Thing/AuthorizeAction/index.ts"

import AllocateAction from "./index.tsx"

export type Props = BaseComponentProps<
	AuthorizeActionProps,
	"AuthorizeAction",
	ExtractLevelProps<AuthorizeActionProps, AllocateActionProps>
>

export default function AuthorizeAction(
	{
		recipient,
		schemaType = "AuthorizeAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AllocateAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				recipient,
				...subtypeProperties,
			}}
		/>
	)
}
