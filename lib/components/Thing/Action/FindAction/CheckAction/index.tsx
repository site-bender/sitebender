import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CheckActionProps from "../../../../../types/Thing/CheckAction/index.ts"
import type FindActionProps from "../../../../../types/Thing/FindAction/index.ts"

import FindAction from "./index.tsx"

// CheckAction adds no properties to the FindAction schema type
export type Props = BaseComponentProps<
	CheckActionProps,
	"CheckAction",
	ExtractLevelProps<CheckActionProps, FindActionProps>
>

export default function CheckAction({
	schemaType = "CheckAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<FindAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
