import type BaseProps from "../../../../types/index.ts"
import type { Manuscript as ManuscriptProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ManuscriptProps & BaseProps

export default function Manuscript({
	_type = "Manuscript",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
