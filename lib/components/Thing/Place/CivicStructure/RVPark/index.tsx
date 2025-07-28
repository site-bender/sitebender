import type BaseProps from "../../../../../types/index.ts"
import type { RVParkProps } from "../../../../../types/Thing/Place/CivicStructure/RVPark/index.ts"

import CivicStructure from "../index.tsx"

export type Props = RVParkProps & BaseProps

export default function RVPark({
	_type = "RVPark",
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
