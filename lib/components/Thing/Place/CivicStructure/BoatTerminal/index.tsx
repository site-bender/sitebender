import type BaseProps from "../../../../../types/index.ts"
import type BoatTerminalProps from "../../../../../types/Thing/Place/CivicStructure/BoatTerminal/index.ts"

import CivicStructure from "../index.tsx"

export type Props = BoatTerminalProps & BaseProps

export default function BoatTerminal({
	_type = "BoatTerminal",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
