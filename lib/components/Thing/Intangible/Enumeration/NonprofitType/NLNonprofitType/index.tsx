import type BaseProps from "../../../../../../types/index.ts"
import type { NLNonprofitTypeProps } from "../../../../../../types/Thing/Intangible/Enumeration/NonprofitType/NLNonprofitType/index.ts"

import NonprofitType from "../index.tsx"

export type Props = NLNonprofitTypeProps & BaseProps

export default function NLNonprofitType({
	_type = "NLNonprofitType",
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
