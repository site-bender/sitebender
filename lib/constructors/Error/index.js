const Error = operation => type => message => ({
	tag: "Error",
	message,
	operation,
	type,
})

export default Error
