import type BaseProps from "../../../../../../types/index.ts"
import type HostelProps from "../../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/Hostel/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = HostelProps & BaseProps

export default function Hostel({
	_type = "Hostel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LodgingBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</LodgingBusiness>
	)
}
