import type BaseProps from "../../../../types/index.ts"
import type { Class as ClassProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ClassProps & BaseProps

export default function Class({
	_type = "Class",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
