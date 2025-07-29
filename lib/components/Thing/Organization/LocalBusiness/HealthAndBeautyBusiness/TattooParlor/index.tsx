import type BaseProps from "../../../../../../types/index.ts"
import type TattooParlorProps from "../../../../../../types/Thing/Organization/LocalBusiness/HealthAndBeautyBusiness/TattooParlor/index.ts"

import HealthAndBeautyBusiness from "../index.tsx"

export type Props = TattooParlorProps & BaseProps

export default function TattooParlor({
	_type = "TattooParlor",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<HealthAndBeautyBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
