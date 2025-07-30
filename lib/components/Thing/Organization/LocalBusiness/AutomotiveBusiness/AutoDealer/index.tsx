import type BaseProps from "../../../../../../types/index.ts"
import type AutoDealerProps from "../../../../../../types/Thing/Organization/LocalBusiness/AutomotiveBusiness/AutoDealer/index.ts"

import AutomotiveBusiness from "../index.tsx"

export type Props = AutoDealerProps & BaseProps

export default function AutoDealer({
	_type = "AutoDealer",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AutomotiveBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</AutomotiveBusiness>
	)
}
