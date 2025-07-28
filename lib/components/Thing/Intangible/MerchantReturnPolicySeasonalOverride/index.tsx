import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { MerchantReturnPolicySeasonalOverrideProps } from "../../../../types/Thing/Intangible/MerchantReturnPolicySeasonalOverride/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	MerchantReturnPolicySeasonalOverrideProps,
	"MerchantReturnPolicySeasonalOverride",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

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
	schemaType = "MerchantReturnPolicySeasonalOverride",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
