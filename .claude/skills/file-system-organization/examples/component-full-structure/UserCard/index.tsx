export type Props = {
	readonly name: string
	readonly age: number
}

//++ Displays a user card with name and age
export default function UserCard(props: Props) {
	return (
		<div className="user-card">
			<h2>{props.name}</h2>
			<p>Age: {props.age}</p>
		</div>
	)
}
