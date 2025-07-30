import type BaseProps from "../../../../../../types/index.ts"
import type LegalForceStatusProps from "../../../../../../types/Thing/Intangible/Enumeration/StatusEnumeration/LegalForceStatus/index.ts"

import StatusEnumeration from "../index.tsx"

export type Props = LegalForceStatusProps & BaseProps

export default function LegalForceStatus({
	_type = "LegalForceStatus",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StatusEnumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</StatusEnumeration>
	)
}
