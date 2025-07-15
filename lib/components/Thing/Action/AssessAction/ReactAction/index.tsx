import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AssessActionProps from "../../../../../types/Thing/AssessAction/index.ts"
import type ReactActionProps from "../../../../../types/Thing/ReactAction/index.ts"

import AssessAction from "./index.tsx"

// ReactAction adds no properties to the AssessAction schema type
export type Props = BaseComponentProps<
	ReactActionProps,
	"ReactAction",
	ExtractLevelProps<ReactActionProps, AssessActionProps>
>

export default function ReactAction({
	schemaType = "ReactAction",
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
