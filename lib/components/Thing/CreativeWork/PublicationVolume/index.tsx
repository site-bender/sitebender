import type BaseProps from "../../../../types/index.ts"
import type { PublicationVolumeProps } from "../../../../types/Thing/CreativeWork/PublicationVolume/index.ts"

import CreativeWork from "../index.tsx"

export type Props = PublicationVolumeProps & BaseProps

export default function PublicationVolume({
	pageEnd,
	pageStart,
	pagination,
	volumeNumber,
	_type = "PublicationVolume",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				pageEnd,
				pageStart,
				pagination,
				volumeNumber,
				...subtypeProperties,
			}}
		/>
	)
}
