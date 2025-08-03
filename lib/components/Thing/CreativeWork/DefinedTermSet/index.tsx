import type BaseProps from "../../../../types/index.ts"
import type { DefinedTermSet as DefinedTermSetProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = DefinedTermSetProps & BaseProps

export default function DefinedTermSet({
	_type = "DefinedTermSet",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
