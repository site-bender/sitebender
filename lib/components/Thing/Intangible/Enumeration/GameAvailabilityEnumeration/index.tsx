import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type EnumerationProps from "../../../../../types/Thing/Enumeration/index.ts"
import type GameAvailabilityEnumerationProps from "../../../../../types/Thing/GameAvailabilityEnumeration/index.ts"

import Enumeration from "./index.tsx"

// GameAvailabilityEnumeration adds no properties to the Enumeration schema type
export type Props = BaseComponentProps<
	GameAvailabilityEnumerationProps,
	"GameAvailabilityEnumeration",
	ExtractLevelProps<GameAvailabilityEnumerationProps, EnumerationProps>
>

export default function GameAvailabilityEnumeration({
	schemaType = "GameAvailabilityEnumeration",
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
