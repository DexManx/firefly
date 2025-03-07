/** NOTE: SENTRY_MAIN_PROCESS, SENTRY_DSN, SENTRY_ENVIRONMENT, and PRELOAD_SCRIPT are replaced by Webpack at compile-time. */

/* eslint-disable no-undef */
const Sentry = SENTRY_MAIN_PROCESS ? require('@sentry/electron/dist/main') : require('@sentry/electron/dist/renderer')

const appName = 'Firefly'
const debug = true
/* eslint-disable no-undef */
const dsn = SENTRY_DSN || ''
/* eslint-disable no-undef */
const environment = SENTRY_ENVIRONMENT || ''

let machineId = ''

/* eslint-disable no-undef */
if (SENTRY_MAIN_PROCESS || PRELOAD_SCRIPT) {
    const { machineIdSync } = require('node-machine-id')
    try {
        machineId = machineIdSync()
    } catch (error) {
        console.error(error)
    }
} else {
    const { Electron } = require('shared/lib/electron')
    Electron.getMachineId().then((id) => {
        machineId = id
    })
}

module.exports = function (initialize) {
    if (initialize) {
        Sentry.init({ appName, debug, dsn, environment })
        Sentry.setUser({ id: machineId })
    }

    return {
        captureException: Sentry.captureException,
    }
}
