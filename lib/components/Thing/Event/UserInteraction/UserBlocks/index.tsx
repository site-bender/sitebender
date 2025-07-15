import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserBlocksProps from "../../../../../types/Thing/UserBlocks/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"

import UserInteraction from "./index.tsx"

// UserBlocks adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserBlocksProps,
	"UserBlocks",
	ExtractLevelProps<UserBlocksProps, UserInteractionProps>
>

export default function UserBlocks({
	schemaType = "UserBlocks",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<UserInteraction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
