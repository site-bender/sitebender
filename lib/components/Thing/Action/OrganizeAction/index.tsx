import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type OrganizeActionProps from "../../../../types/Thing/OrganizeAction/index.ts"

import Action from "../index.tsx"

// OrganizeAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	OrganizeActionProps,
	"OrganizeAction",
	ExtractLevelProps<OrganizeActionProps, ActionProps>
>

export default function OrganizeAction({
	schemaType = "OrganizeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Action
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
