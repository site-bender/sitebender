import type BaseProps from "../../../../../../types/index.ts"
import type ArtGalleryProps from "../../../../../../types/Thing/Organization/LocalBusiness/EntertainmentBusiness/ArtGallery/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = ArtGalleryProps & BaseProps

export default function ArtGallery({
	_type = "ArtGallery",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<EntertainmentBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</EntertainmentBusiness>
	)
}
