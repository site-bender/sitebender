import type BaseProps from "../../../../types/index.ts"
import type AirlineProps from "../../../../types/Thing/Organization/Airline/index.ts"

import Organization from "../index.tsx"

export type Props = AirlineProps & BaseProps

export default function Airline({
	boardingPolicy,
	iataCode,
	_type = "Airline",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				boardingPolicy,
				iataCode,
				...subtypeProperties,
			}}
		/>
	)
}
