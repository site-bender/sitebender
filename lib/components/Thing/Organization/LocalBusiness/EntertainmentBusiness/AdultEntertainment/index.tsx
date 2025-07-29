import type BaseProps from "../../../../../../types/index.ts"
import type AdultEntertainmentProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/AdultEntertainment/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = AdultEntertainmentProps & BaseProps

export default function AdultEntertainment({
	_type = "AdultEntertainment",
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
		/>
	)
}
