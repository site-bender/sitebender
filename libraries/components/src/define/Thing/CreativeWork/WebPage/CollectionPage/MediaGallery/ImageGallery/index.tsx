import type BaseProps from "../../../../../../../../types/index.ts"
import type { ImageGallery as ImageGalleryProps } from "../../../../../../../../types/index.ts"

import Base from "../../../../../../Base/index.tsx"

export type Props = ImageGalleryProps & BaseProps

export default function ImageGallery({
	_type = "ImageGallery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
