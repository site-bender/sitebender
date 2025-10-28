import type BaseProps from "../../../../../types/index.ts"
import type { Language as LanguageProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = LanguageProps & BaseProps

export default function Language({
	_type = "Language",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
