import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MediaObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/index.ts"
import type { DataDownloadProps } from "../../../../../types/Thing/CreativeWork/MediaObject/DataDownload/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	DataDownloadProps,
	"DataDownload",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MediaObjectProps>
>

export default function DataDownload({
	measurementMethod,
	measurementTechnique,
	schemaType = "DataDownload",
	subtypeProperties = {},
	...props
}): Props {
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
