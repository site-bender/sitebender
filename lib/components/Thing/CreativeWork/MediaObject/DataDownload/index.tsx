import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DataDownloadProps from "../../../../../types/Thing/DataDownload/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	DataDownloadProps,
	"DataDownload",
	ExtractLevelProps<DataDownloadProps, MediaObjectProps>
>

export default function DataDownload(
	{
		measurementMethod,
		measurementTechnique,
		schemaType = "DataDownload",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				measurementMethod,
				measurementTechnique,
				...subtypeProperties,
			}}
		/>
	)
}
