import type BaseProps from "../../../../../../types/index.ts"
import type AmusementParkProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/AmusementPark/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = AmusementParkProps & BaseProps

export default function AmusementPark({
	_type = "AmusementPark",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EntertainmentBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</EntertainmentBusiness>
	)
}
