// @sitebender/arborist/demo/examples/UserCard
//++ Example JSX component demonstrating proper component structure

import type { ComponentChildren } from "@sitebender/codewright/types/index.ts"

export type UserCardProps = Readonly<{
	name: string
	email: string
	children?: ComponentChildren
}>

//++ Renders a user card component
export default function UserCard(props: UserCardProps) {
	return function renderUserCard(): JSX.Element {
		return (
			<Add class="user-card">
				<h2>{props.name}</h2>
				<p>{props.email}</p>
				{props.children}
			</Add>
		)
	}
}
