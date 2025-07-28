import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { DatasetProps } from "../../../../types/Thing/CreativeWork/Dataset/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	DatasetProps,
	"Dataset",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "Dataset",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
