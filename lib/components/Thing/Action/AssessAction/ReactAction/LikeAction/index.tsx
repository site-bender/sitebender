import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LikeActionProps from "../../../../../../types/Thing/LikeAction/index.ts"
import type ReactActionProps from "../../../../../../types/Thing/ReactAction/index.ts"

import ReactAction from "../index.tsx"

// LikeAction adds no properties to the ReactAction schema type
export type Props = BaseComponentProps<
	LikeActionProps,
	"LikeAction",
	ExtractLevelProps<LikeActionProps, ReactActionProps>
>

export default function LikeAction({
	schemaType = "LikeAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ReactAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
