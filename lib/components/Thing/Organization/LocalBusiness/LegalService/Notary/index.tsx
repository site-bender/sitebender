import type BaseProps from "../../../../../../types/index.ts"
import type NotaryProps from "../../../../../../types/Thing/Organization/LocalBusiness/LegalService/Notary/index.ts"

import LegalService from "../index.tsx"

export type Props = NotaryProps & BaseProps

export default function Notary({
	_type = "Notary",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LegalService
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</LegalService>
	)
}
