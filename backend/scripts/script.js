#!/usr/bin/env node

// === HEX TO EPOCH ===

parseInt('019484a82680',16)
// --> 1737392400000

parseInt('682CC801', 16)
// --> 1747765249

// === EPOCH TO HEX ===

let epoch_ms = 1737392400000
epoch_ms.toString(16)
// --> '19484a82680'

let epoch = 1737392400
epoch.toString(16)
// --> '678e8110'

// === TO DATETIME ===

new Date(1737392400000).toString()
// --> 'Mon Jan 20 2025 12:00:00 GMT-0500 (Eastern Standard Time)'

new Date(parseInt('019484a82680',16)).toString()
// --> 'Mon Jan 20 2025 12:00:00 GMT-0500 (Eastern Standard Time)'
