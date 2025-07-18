import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type DataCatalogProps from "../../../../types/Thing/DataCatalog/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	DataCatalogProps,
	"DataCatalog",
	ExtractLevelProps<DataCatalogProps, CreativeWorkProps>
>

export default function DataCatalog(
	{
		dataset,
		measurementMethod,
		measurementTechnique,
		schemaType = "DataCatalog",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				dataset,
				measurementMethod,
				measurementTechnique,
				...subtypeProperties,
			}}
		/>
	)
}
