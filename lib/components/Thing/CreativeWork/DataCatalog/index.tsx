import type BaseProps from "../../../../types/index.ts"
import type DataCatalogProps from "../../../../types/Thing/CreativeWork/DataCatalog/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DataCatalogProps & BaseProps

export default function DataCatalog({
	dataset,
	measurementMethod,
	measurementTechnique,
	_type = "DataCatalog",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				dataset,
				measurementMethod,
				measurementTechnique,
				...subtypeProperties,
			}}
		/>
	)
}
