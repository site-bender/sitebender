import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ApplyActionProps from "../../../../../types/Thing/ApplyAction/index.ts"
import type OrganizeActionProps from "../../../../../types/Thing/OrganizeAction/index.ts"

import OrganizeAction from "./index.tsx"

// ApplyAction adds no properties to the OrganizeAction schema type
export type Props = BaseComponentProps<
	ApplyActionProps,
	"ApplyAction",
	ExtractLevelProps<ApplyActionProps, OrganizeActionProps>
>

export default function ApplyAction({
	schemaType = "ApplyAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<OrganizeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
