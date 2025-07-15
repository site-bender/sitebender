import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type UserCheckinsProps from "../../../../../types/Thing/UserCheckins/index.ts"
import type UserInteractionProps from "../../../../../types/Thing/UserInteraction/index.ts"

import UserInteraction from "./index.tsx"

// UserCheckins adds no properties to the UserInteraction schema type
export type Props = BaseComponentProps<
	UserCheckinsProps,
	"UserCheckins",
	ExtractLevelProps<UserCheckinsProps, UserInteractionProps>
>

export default function UserCheckins({
	schemaType = "UserCheckins",
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
