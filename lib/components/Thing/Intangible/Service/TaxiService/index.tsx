import type BaseProps from "../../../../../types/index.ts"
import type TaxiServiceProps from "../../../../../types/Thing/Intangible/Service/TaxiService/index.ts"

import Service from "../index.tsx"

export type Props = TaxiServiceProps & BaseProps

export default function TaxiService({
	_type = "TaxiService",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Service
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
