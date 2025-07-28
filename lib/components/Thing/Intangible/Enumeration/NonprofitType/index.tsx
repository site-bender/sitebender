import type BaseProps from "../../../../../types/index.ts"
import type { NonprofitTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/NonprofitType/index.ts"

import Enumeration from "../index.tsx"

export type Props = NonprofitTypeProps & BaseProps

export default function NonprofitType({
	_type = "NonprofitType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
