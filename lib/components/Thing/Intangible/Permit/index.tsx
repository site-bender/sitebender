import type BaseProps from "../../../../types/index.ts"
import type { PermitProps } from "../../../../types/Thing/Intangible/Permit/index.ts"

import Intangible from "../index.tsx"

export type Props = PermitProps & BaseProps

export default function Permit({
	issuedBy,
	issuedThrough,
	permitAudience,
	validFor,
	validFrom,
	validIn,
	validUntil,
	_type = "Permit",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				issuedBy,
				issuedThrough,
				permitAudience,
				validFor,
				validFrom,
				validIn,
				validUntil,
				...subtypeProperties,
			}}
		/>
	)
}
