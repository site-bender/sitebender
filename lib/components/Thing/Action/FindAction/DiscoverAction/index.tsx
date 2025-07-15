import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DiscoverActionProps from "../../../../../types/Thing/DiscoverAction/index.ts"
import type FindActionProps from "../../../../../types/Thing/FindAction/index.ts"

import FindAction from "./index.tsx"

// DiscoverAction adds no properties to the FindAction schema type
export type Props = BaseComponentProps<
	DiscoverActionProps,
	"DiscoverAction",
	ExtractLevelProps<DiscoverActionProps, FindActionProps>
>

export default function DiscoverAction({
	schemaType = "DiscoverAction",
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
