import type BaseProps from "../../../../../../types/index.ts"
import type { Newspaper as NewspaperProps } from "../../../../../../types/index.ts"

import Periodical from "../index.tsx"

export type Props = NewspaperProps & BaseProps

export default function Newspaper({
	_type = "Newspaper",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
