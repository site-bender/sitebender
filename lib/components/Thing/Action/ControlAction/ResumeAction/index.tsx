import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ControlActionProps from "../../../../../types/Thing/ControlAction/index.ts"
import type ResumeActionProps from "../../../../../types/Thing/ResumeAction/index.ts"

import ControlAction from "../index.tsx"

// ResumeAction adds no properties to the ControlAction schema type
export type Props = BaseComponentProps<
	ResumeActionProps,
	"ResumeAction",
	ExtractLevelProps<ResumeActionProps, ControlActionProps>
>

export default function ResumeAction({
	schemaType = "ResumeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ControlAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
