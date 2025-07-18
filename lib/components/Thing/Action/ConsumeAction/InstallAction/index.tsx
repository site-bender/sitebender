import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ConsumeActionProps from "../../../../../types/Thing/ConsumeAction/index.ts"
import type InstallActionProps from "../../../../../types/Thing/InstallAction/index.ts"

import ConsumeAction from "../index.tsx"

// InstallAction adds no properties to the ConsumeAction schema type
export type Props = BaseComponentProps<
	InstallActionProps,
	"InstallAction",
	ExtractLevelProps<InstallActionProps, ConsumeActionProps>
>

export default function InstallAction({
	schemaType = "InstallAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ConsumeAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
