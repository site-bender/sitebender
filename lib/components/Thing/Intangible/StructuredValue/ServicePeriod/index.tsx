import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ServicePeriodProps from "../../../../../types/Thing/ServicePeriod/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	ServicePeriodProps,
	"ServicePeriod",
	ExtractLevelProps<ServicePeriodProps, StructuredValueProps>
>

export default function ServicePeriod(
	{
		businessDays,
		cutoffTime,
		duration,
		schemaType = "ServicePeriod",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				businessDays,
				cutoffTime,
				duration,
				...subtypeProperties,
			}}
		/>
	)
}
