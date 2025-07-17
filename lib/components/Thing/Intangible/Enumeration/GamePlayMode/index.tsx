import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type GamePlayModeProps from "../../../../../types/Thing/GamePlayMode/index.ts"

import Enumeration from "../index.tsx"

// GamePlayMode adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	GamePlayModeProps,
	"GamePlayMode",
	ExtractLevelProps<GamePlayModeProps, EnumerationProps>
>

export default function GamePlayMode({
	schemaType = "GamePlayMode",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Enumeration
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
