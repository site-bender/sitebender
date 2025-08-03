import type BaseProps from "../../../../../../types/index.ts"
import type { ArtGallery as ArtGalleryProps } from "../../../../../../types/index.ts"

import EntertainmentBusiness from "../index.tsx"

export type Props = ArtGalleryProps & BaseProps

export default function ArtGallery({
	_type = "ArtGallery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
