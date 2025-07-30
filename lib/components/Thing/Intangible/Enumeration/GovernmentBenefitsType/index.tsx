import type BaseProps from "../../../../../types/index.ts"
import type GovernmentBenefitsTypeProps from "../../../../../types/Thing/Intangible/Enumeration/GovernmentBenefitsType/index.ts"

import Enumeration from "../index.tsx"

export type Props = GovernmentBenefitsTypeProps & BaseProps

export default function GovernmentBenefitsType({
	_type = "GovernmentBenefitsType",
	children,
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
		>{children}</Enumeration>
	)
}
