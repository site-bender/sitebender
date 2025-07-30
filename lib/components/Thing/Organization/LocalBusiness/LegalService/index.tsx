import type BaseProps from "../../../../../types/index.ts"
import type LegalServiceProps from "../../../../../types/Thing/Organization/LocalBusiness/LegalService/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = LegalServiceProps & BaseProps

export default function LegalService({
	_type = "LegalService",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</LocalBusiness>
	)
}
