import type BaseProps from "../../../../../../types/index.ts"
import type CasinoProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/Casino/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = CasinoProps & BaseProps

export default function Casino({
	_type = "Casino",
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
		>{children}</EntertainmentBusiness>
	)
}
