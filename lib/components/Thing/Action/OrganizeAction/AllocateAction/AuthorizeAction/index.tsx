import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../../types/Thing/Action/index.ts"
import type { OrganizeActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/index.ts"
import type { AllocateActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/index.ts"
import type { AuthorizeActionProps } from "../../../../../../types/Thing/Action/OrganizeAction/AllocateAction/AuthorizeAction/index.ts"

import AllocateAction from "../index.tsx"

export type Props = BaseComponentProps<
	AuthorizeActionProps,
	"AuthorizeAction",
	ExtractLevelProps<ThingProps, ActionProps, OrganizeActionProps, AllocateActionProps>
>

export default function AuthorizeAction({
	recipient,
	schemaType = "AuthorizeAction",
	subtypeProperties = {},
	...props
}): Props {
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
