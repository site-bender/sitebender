import type BaseProps from "../../../../types/index.ts"
import type { Guide as GuideProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = GuideProps & BaseProps

export default function Guide({
	_type = "Guide",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
