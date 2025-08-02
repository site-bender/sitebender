import type BaseProps from "../../../../../../types/index.ts"
import type USNonprofitTypeProps from "../../../../../../types/Thing/Intangible/Enumeration/NonprofitType/USNonprofitType/index.ts"

import NonprofitType from "../index.tsx"

export type Props = USNonprofitTypeProps & BaseProps

export default function USNonprofitType({
	_type = "USNonprofitType",
	children,
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
		>
			{children}
		</NonprofitType>
	)
}
