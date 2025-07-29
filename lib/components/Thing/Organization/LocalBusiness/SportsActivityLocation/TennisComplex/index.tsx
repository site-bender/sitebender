import type BaseProps from "../../../../../../types/index.ts"
import type TennisComplexProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/TennisComplex/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = TennisComplexProps & BaseProps

export default function TennisComplex({
	_type = "TennisComplex",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
