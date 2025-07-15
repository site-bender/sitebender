import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ActionProps from "../../../../types/Thing/Action/index.ts"
import type AssessActionProps from "../../../../types/Thing/AssessAction/index.ts"

import Action from "./index.tsx"

// AssessAction adds no properties to the Action schema type
export type Props = BaseComponentProps<
	AssessActionProps,
	"AssessAction",
	ExtractLevelProps<AssessActionProps, ActionProps>
>

export default function AssessAction({
	schemaType = "AssessAction",
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
