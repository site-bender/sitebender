import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { ServicePeriodProps } from "../../../../../types/Thing/Intangible/StructuredValue/ServicePeriod/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	ServicePeriodProps,
	"ServicePeriod",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function ServicePeriod({
	businessDays,
	cutoffTime,
	duration,
	schemaType = "ServicePeriod",
	subtypeProperties = {},
	...props
}): Props {
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
