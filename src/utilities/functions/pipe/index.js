const pipe =
	(fns = []) =>
	input =>
		fns.reduce((out, fn) => fn(out), input)

export default pipe
