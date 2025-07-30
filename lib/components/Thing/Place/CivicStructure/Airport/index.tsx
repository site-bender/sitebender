import type BaseProps from "../../../../../types/index.ts"
import type AirportProps from "../../../../../types/Thing/Place/CivicStructure/Airport/index.ts"

import CivicStructure from "../index.tsx"

export type Props = AirportProps & BaseProps

export default function Airport({
	iataCode,
	icaoCode,
	_type = "Airport",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				iataCode,
				icaoCode,
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
