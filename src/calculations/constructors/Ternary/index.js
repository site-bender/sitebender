const Ternary = condition => ifTrue => ifFalse => ({
	condition,
	ifFalse,
	ifTrue,
	tag: "Ternary",
})

export default Ternary
