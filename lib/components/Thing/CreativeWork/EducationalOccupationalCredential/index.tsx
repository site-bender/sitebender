import type BaseProps from "../../../../types/index.ts"
import type { EducationalOccupationalCredential as EducationalOccupationalCredentialProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = EducationalOccupationalCredentialProps & BaseProps

export default function EducationalOccupationalCredential({
	_type = "EducationalOccupationalCredential",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
