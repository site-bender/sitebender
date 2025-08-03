import type BaseProps from "../../../../../types/index.ts"
import type { ElementarySchool as ElementarySchoolProps } from "../../../../../types/index.ts"

import EducationalOrganization from "../index.tsx"

export type Props = ElementarySchoolProps & BaseProps

export default function ElementarySchool({
	_type = "ElementarySchool",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
