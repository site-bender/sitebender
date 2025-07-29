import type BaseProps from "../../../../types/index.ts"
import type DatasetProps from "../../../../types/Thing/CreativeWork/Dataset/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DatasetProps & BaseProps

export default function Dataset({
	catalog,
	datasetTimeInterval,
	distribution,
	includedDataCatalog,
	includedInDataCatalog,
	issn,
	measurementMethod,
	measurementTechnique,
	variableMeasured,
	variablesMeasured,
	_type = "Dataset",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				catalog,
				datasetTimeInterval,
				distribution,
				includedDataCatalog,
				includedInDataCatalog,
				issn,
				measurementMethod,
				measurementTechnique,
				variableMeasured,
				variablesMeasured,
				...subtypeProperties,
			}}
		/>
	)
}
