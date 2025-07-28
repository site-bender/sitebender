import type BaseProps from "../../../../../types/index.ts"
import type { BusinessAudienceProps } from "../../../../../types/Thing/Intangible/Audience/BusinessAudience/index.ts"

import Audience from "../index.tsx"

export type Props = BusinessAudienceProps & BaseProps

export default function BusinessAudience({
	numberOfEmployees,
	yearlyRevenue,
	yearsInOperation,
	_type = "BusinessAudience",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Audience
			{...props}
			_type={_type}
			subtypeProperties={{
				numberOfEmployees,
				yearlyRevenue,
				yearsInOperation,
				...subtypeProperties,
			}}
		/>
	)
}
