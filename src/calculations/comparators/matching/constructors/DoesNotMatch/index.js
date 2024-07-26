const DoesNotMatch = operand => pattern => flags => ({
	tag: "DoesNotMatch",
	datatype: "String",
	flags,
	operand,
	pattern,
})

export default DoesNotMatch
