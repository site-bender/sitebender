import type BaseProps from "../../../../../types/index.ts"
import type CertificationStatusEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/CertificationStatusEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = CertificationStatusEnumerationProps & BaseProps

export default function CertificationStatusEnumeration({
	_type = "CertificationStatusEnumeration",
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
