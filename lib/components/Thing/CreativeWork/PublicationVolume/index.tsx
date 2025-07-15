import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PublicationVolumeProps from "../../../../types/Thing/PublicationVolume/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	PublicationVolumeProps,
	"PublicationVolume",
	ExtractLevelProps<PublicationVolumeProps, CreativeWorkProps>
>

export default function PublicationVolume(
	{
		pageEnd,
		pageStart,
		pagination,
		volumeNumber,
		schemaType = "PublicationVolume",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
