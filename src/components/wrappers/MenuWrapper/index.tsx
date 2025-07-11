import type { MenuItem } from "~types/navigation/index.ts"

import Menu from "~components/navigation/Menu/index.tsx"

import createElement from "~utilities/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	route: string
}

const options: Array<MenuItem> = [
	{ label: "Backstage", href: "/backstage", id: "primary-navigation" },
	{ label: "Manage", href: "/backstage/manage" },
	{ label: "Moderate", href: "/backstage/moderate" },
	{ label: "Contribute", href: "/backstage/contribute" },
]

export default function MenuWrapper({ route }: Props) {
	return <Menu options={options} route={route} />
}
