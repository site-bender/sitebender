const Matches = operand => pattern => flags => ({
	tag: "Matches",
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default Matches
