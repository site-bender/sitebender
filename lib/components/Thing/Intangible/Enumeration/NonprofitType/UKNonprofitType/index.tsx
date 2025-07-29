import type BaseProps from "../../../../../../types/index.ts"
import type UKNonprofitTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/NonprofitType/UKNonprofitType/index.ts"

import NonprofitType from "../index.tsx"

export type Props = UKNonprofitTypeProps & BaseProps

export default function UKNonprofitType({
	_type = "UKNonprofitType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<NonprofitType
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
