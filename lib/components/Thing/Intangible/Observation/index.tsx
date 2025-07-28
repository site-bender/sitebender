import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { ObservationProps } from "../../../../types/Thing/Intangible/Observation/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	ObservationProps,
	"Observation",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function Observation({
	marginOfError,
	measuredProperty,
	measurementDenominator,
	measurementMethod,
	measurementQualifier,
	measurementTechnique,
	observationAbout,
	observationDate,
	observationPeriod,
	variableMeasured,
	schemaType = "Observation",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				marginOfError,
				measuredProperty,
				measurementDenominator,
				measurementMethod,
				measurementQualifier,
				measurementTechnique,
				observationAbout,
				observationDate,
				observationPeriod,
				variableMeasured,
				...subtypeProperties,
			}}
		/>
	)
}
