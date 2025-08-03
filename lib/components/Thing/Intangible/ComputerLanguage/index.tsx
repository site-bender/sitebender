import type BaseProps from "../../../../types/index.ts"
import type { ComputerLanguage as ComputerLanguageProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = ComputerLanguageProps & BaseProps

export default function ComputerLanguage({
	_type = "ComputerLanguage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
