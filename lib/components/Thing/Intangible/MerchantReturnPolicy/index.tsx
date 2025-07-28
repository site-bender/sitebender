import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { MerchantReturnPolicyProps } from "../../../../types/Thing/Intangible/MerchantReturnPolicy/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	MerchantReturnPolicyProps,
	"MerchantReturnPolicy",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

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
	schemaType = "MerchantReturnPolicy",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
