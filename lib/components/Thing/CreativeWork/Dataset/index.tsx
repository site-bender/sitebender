import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type DatasetProps from "../../../../types/Thing/Dataset/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	DatasetProps,
	"Dataset",
	ExtractLevelProps<DatasetProps, CreativeWorkProps>
>

export default function Dataset(
	{
		catalog,
		datasetTimeInterval,
		distribution,
		includedDataCatalog,
		includedInDataCatalog,
		issn,
		measurementMethod,
		measurementTechnique,
		variableMeasured,
		schemaType = "Dataset",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
				...subtypeProperties,
			}}
		/>
	)
}
