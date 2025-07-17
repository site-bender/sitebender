import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AssessActionProps from "../../../../../types/Thing/AssessAction/index.ts"
import type IgnoreActionProps from "../../../../../types/Thing/IgnoreAction/index.ts"

import AssessAction from "../index.tsx"

// IgnoreAction adds no properties to the AssessAction schema type
export type Props = BaseComponentProps<
	IgnoreActionProps,
	"IgnoreAction",
	ExtractLevelProps<IgnoreActionProps, AssessActionProps>
>

export default function IgnoreAction({
	schemaType = "IgnoreAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<AssessAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
