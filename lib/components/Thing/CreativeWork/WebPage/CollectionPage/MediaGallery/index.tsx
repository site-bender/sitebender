import type BaseProps from "../../../../../../types/index.ts"
import type MediaGalleryProps from "../../../../../../types/Thing/CreativeWork/WebPage/CollectionPage/MediaGallery/index.ts"

import CollectionPage from "../index.tsx"

export type Props = MediaGalleryProps & BaseProps

export default function MediaGallery({
	_type = "MediaGallery",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CollectionPage
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CollectionPage>
	)
}
