import type BaseProps from "../../../../types/index.ts"
import type { ComicStory as ComicStoryProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ComicStoryProps & BaseProps

export default function ComicStory({
	_type = "ComicStory",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
