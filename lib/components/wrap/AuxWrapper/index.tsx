import type { MenuItem } from "../../../types/components/navigation/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import Aux from "../../navigation/Aux/index.tsx"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	route: string
}

const options: Array<MenuItem> = [
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
	{ label: "Cookies", href: "/cookie-policy" },
	{ label: "Privacy", href: "/privacy-policy" },
	{ label: "Terms", href: "/terms-of-use" },
]

export default function AuxWrapper({ route }: Props) {
	return <Aux options={options} route={route} />
}
