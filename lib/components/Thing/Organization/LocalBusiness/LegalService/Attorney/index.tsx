import type BaseProps from "../../../../../../types/index.ts"
import type { AttorneyProps } from "../../../../../../types/Thing/Organization/LocalBusiness/LegalService/Attorney/index.ts"

import LegalService from "../index.tsx"

export type Props = AttorneyProps & BaseProps

export default function Attorney({
	_type = "Attorney",
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
		/>
	)
}
