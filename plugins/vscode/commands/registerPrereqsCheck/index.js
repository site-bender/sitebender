const vscode = require('vscode')
const { runDenoScript } = require('../runDenoScript/index.js')

function registerPrereqsCheck(context) {
	return vscode.commands.registerCommand('sitebenderAgent.prereqs.check', () => {
		runDenoScript(context, 'checkPrereqs')
	})
}

module.exports = registerPrereqsCheck
