import type BaseProps from "../../../../../types/index.ts"
import type { AquariumProps } from "../../../../../types/Thing/Place/CivicStructure/Aquarium/index.ts"

import CivicStructure from "../index.tsx"

export type Props = AquariumProps & BaseProps

export default function Aquarium({
	_type = "Aquarium",
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
