import type BaseProps from "../../../../types/index.ts"
import type ObservationProps from "../../../../types/Thing/Intangible/Observation/index.ts"

import Intangible from "../index.tsx"

export type Props = ObservationProps & BaseProps

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
	_type = "Observation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
