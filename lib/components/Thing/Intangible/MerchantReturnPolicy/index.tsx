import type BaseProps from "../../../../types/index.ts"
import type MerchantReturnPolicyProps from "../../../../types/Thing/Intangible/MerchantReturnPolicy/index.ts"

import Intangible from "../index.tsx"

export type Props = MerchantReturnPolicyProps & BaseProps

export default function MerchantReturnPolicy({
	additionalProperty,
	applicableCountry,
	customerRemorseReturnFees,
	customerRemorseReturnLabelSource,
	customerRemorseReturnShippingFeesAmount,
	inStoreReturnsOffered,
	itemCondition,
	itemDefectReturnFees,
	itemDefectReturnLabelSource,
	itemDefectReturnShippingFeesAmount,
	merchantReturnDays,
	merchantReturnLink,
	refundType,
	restockingFee,
	returnFees,
	returnLabelSource,
	returnMethod,
	returnPolicyCategory,
	returnPolicyCountry,
	returnPolicySeasonalOverride,
	returnShippingFeesAmount,
	validForMemberTier,
	_type = "MerchantReturnPolicy",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				additionalProperty,
				applicableCountry,
				customerRemorseReturnFees,
				customerRemorseReturnLabelSource,
				customerRemorseReturnShippingFeesAmount,
				inStoreReturnsOffered,
				itemCondition,
				itemDefectReturnFees,
				itemDefectReturnLabelSource,
				itemDefectReturnShippingFeesAmount,
				merchantReturnDays,
				merchantReturnLink,
				refundType,
				restockingFee,
				returnFees,
				returnLabelSource,
				returnMethod,
				returnPolicyCategory,
				returnPolicyCountry,
				returnPolicySeasonalOverride,
				returnShippingFeesAmount,
				validForMemberTier,
				...subtypeProperties,
			}}
		/>
	)
}
