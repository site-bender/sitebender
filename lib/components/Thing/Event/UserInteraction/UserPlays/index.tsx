import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"
import type UserPlaysProps from "../../../../../types/Thing/UserPlays/index.ts"

import UserInteraction from "./index.tsx"

// UserPlays adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserPlaysProps,
	"UserPlays",
	ExtractLevelProps<UserPlaysProps, UserInteractionProps>
>

export default function UserPlays({
	schemaType = "UserPlays",
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
