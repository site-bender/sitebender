import type BaseProps from "../../../../../types/index.ts"
import type { ComicCoverArt as ComicCoverArtProps } from "../../../../../types/index.ts"

import ComicStory from "../index.tsx"

export type Props = ComicCoverArtProps & BaseProps

export default function ComicCoverArt({
	_type = "ComicCoverArt",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
