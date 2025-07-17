import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BoatTerminalProps from "../../../../../types/Thing/BoatTerminal/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "../index.tsx"

// BoatTerminal adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	BoatTerminalProps,
	"BoatTerminal",
	ExtractLevelProps<BoatTerminalProps, CivicStructureProps>
>

export default function BoatTerminal({
	schemaType = "BoatTerminal",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
