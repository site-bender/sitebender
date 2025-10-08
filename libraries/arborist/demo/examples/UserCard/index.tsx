//++ Renders a user card with name, email, and active status
//++ Takes props as configuration data
//++ Returns JSX element representing the user card

type UserCardProps = Readonly<{
	name: string
	email: string
	isActive: boolean
	children?: ReadonlyArray<unknown>
}>

export default function UserCard(props: UserCardProps) {
	return function renderUserCard() {
		const statusClass = props.isActive ? "active" : "inactive"

		return (
			<article className="user-card">
				<header className="user-card-header">
					<h2>{props.name}</h2>
					<span className={`status ${statusClass}`}>
						{props.isActive ? "Active" : "Inactive"}
					</span>
				</header>
				<section className="user-card-body">
					<p className="user-email">{props.email}</p>
					{props.children}
				</section>
			</article>
		)
	}
}
