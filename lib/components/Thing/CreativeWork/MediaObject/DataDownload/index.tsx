import type BaseProps from "../../../../../types/index.ts"
import type DataDownloadProps from "../../../../../types/Thing/CreativeWork/MediaObject/DataDownload/index.ts"

import MediaObject from "../index.tsx"

export type Props = DataDownloadProps & BaseProps

export default function DataDownload({
	measurementMethod,
	measurementTechnique,
	_type = "DataDownload",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={{
				measurementMethod,
				measurementTechnique,
				...subtypeProperties,
			}}
		>
			{children}
		</MediaObject>
	)
}
