import type BaseProps from "../../../../../../types/index.ts"
import type { MediaGallery as MediaGalleryProps } from "../../../../../../types/index.ts"

import CollectionPage from "../index.tsx"

export type Props = MediaGalleryProps & BaseProps

export default function MediaGallery({
	_type = "MediaGallery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
