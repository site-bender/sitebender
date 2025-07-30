import type BaseProps from "../../../../types/index.ts"
import type MerchantReturnPolicySeasonalOverrideProps from "../../../../types/Thing/Intangible/MerchantReturnPolicySeasonalOverride/index.ts"

import Intangible from "../index.tsx"

export type Props = MerchantReturnPolicySeasonalOverrideProps & BaseProps

export default function MerchantReturnPolicySeasonalOverride({
	endDate,
	merchantReturnDays,
	refundType,
	restockingFee,
	returnFees,
	returnMethod,
	returnPolicyCategory,
	returnShippingFeesAmount,
	startDate,
	_type = "MerchantReturnPolicySeasonalOverride",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				endDate,
				merchantReturnDays,
				refundType,
				restockingFee,
				returnFees,
				returnMethod,
				returnPolicyCategory,
				returnShippingFeesAmount,
				startDate,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
