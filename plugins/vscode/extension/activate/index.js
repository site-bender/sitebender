const _vscode = require('vscode')
const registerPrereqsCheck = require('../../commands/registerPrereqsCheck/index.js')
const registerInitProject = require('../../commands/registerInitProject/index.js')
const registerComposeUp = require('../../commands/registerComposeUp/index.js')
const registerComposeLogs = require('../../commands/registerComposeLogs/index.js')
const registerComposeDown = require('../../commands/registerComposeDown/index.js')

function activate(context) {
	context.subscriptions.push(
		registerPrereqsCheck(context),
		registerInitProject(context),
		registerComposeUp(context),
		registerComposeLogs(context),
		registerComposeDown(context)
	)
}

module.exports = activate
