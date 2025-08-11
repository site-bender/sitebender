import type BaseProps from "../../../../../../../types/index.ts"
import type { VideoGallery as VideoGalleryProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = VideoGalleryProps & BaseProps

export default function VideoGallery({
	_type = "VideoGallery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
