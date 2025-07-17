import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GameServerStatusProps from "../../../../../../types/Thing/GameServerStatus/index.ts"
import type StatusEnumerationProps from "../../../../../../types/Thing/StatusEnumeration/index.ts"

import StatusEnumeration from "../index.tsx"

// GameServerStatus adds no properties to the StatusEnumeration schema type
export type Props = BaseComponentProps<
	GameServerStatusProps,
	"GameServerStatus",
	ExtractLevelProps<GameServerStatusProps, StatusEnumerationProps>
>

export default function GameServerStatus({
	schemaType = "GameServerStatus",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<StatusEnumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
