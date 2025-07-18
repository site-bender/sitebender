import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type UseActionProps from "../../../../../../types/Thing/UseAction/index.ts"
import type WearActionProps from "../../../../../../types/Thing/WearAction/index.ts"

import UseAction from "../index.tsx"

// WearAction adds no properties to the UseAction schema type
export type Props = BaseComponentProps<
	WearActionProps,
	"WearAction",
	ExtractLevelProps<WearActionProps, UseActionProps>
>

export default function WearAction({
	schemaType = "WearAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<UseAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
