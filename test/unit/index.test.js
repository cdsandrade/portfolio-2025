const test = require('tape')
const { VM } = require('vm2')
const { zettel_to_epoch } = require('../../lib/utils')
const { DateTime } = require('luxon')

test('Sandbox executes simple math correctly', (t) => {
  const vm = new VM({ timeout: 1000 })

  const result = vm.run('2 + 2')
  t.equal(result, 4, '2 + 2 should equal 4')

  t.end()
})

test('Sandbox should throw on bad code', (t) => {
  const vm = new VM({ timeout: 1000 })

  t.throws(() => vm.run('while(true){}'), /Script execution timed out/, 'Infinite loop should timeout')

  t.end()
})

test('zettel_to_epoch() should return proper Unix timestamp from Zettel ID', (t) => {
  expected = 1737392400000
  actual = zettel_to_epoch("202501201200")
  t.deepEquals(actual, expected, 'zettel ID "202501201200" returns 1737392400000')
  t.end()
})

test('zettel_to_epoch() should return proper Unix timestamp from Zettel ID (with seconds)', (t) => {
  expected = 1737392400000
  actual = zettel_to_epoch("20250120120000")
  t.deepEquals(actual, expected, 'zettel ID "20250120120000" returns 1737392400000')
  t.end()
})

test('zettel_to_epoch() should throw on invalid format', (t) => {
  t.throws(() => zettel_to_epoch("20XX0101"), /Invalid Zettel ID format/, 'Invalid Zettel ID throws')
  t.end()
})

test('Happy Path - 12 digits', t => {
  const ts = zettel_to_epoch('202405171230')
  t.equal(new Date(ts).getMinutes(), 30, 'Should correctly parse minute')
  t.end()
})

test('Happy Path - 14 digits with seconds', t => {
  const ts = zettel_to_epoch('20240517123045')
  t.equal(new Date(ts).getSeconds(), 45, 'Should correctly parse seconds')
  t.end()
})

// test('With milliseconds and timezone', t => {
//   const ts = zettel_to_epoch('20240517123045123+00:00')
//   const date = new Date(ts)
//   t.equal(date.getUTCHours(), 12, 'Should parse UTC hour correctly')
//   t.equal(date.getUTCMilliseconds(), 123, 'Should parse ms correctly')
//   t.end()
// })

test('Invalid input - too short', t => {
  t.throws(() => zettel_to_epoch('20240517'), /Invalid/, 'Should throw on too short input')
  t.end()
})

test('Invalid date - February 30th', t => {
  // t.throws(() => zettel_to_epoch('202402301230'), /Invalid/, 'Should throw on impossible date')
  t.ok(isNaN(zettel_to_epoch('202402301230')), 'Should produce NaN on impossible date')
  t.end()
})

// test('DST Boundary - ET Fall Back Hour', t => {
//   const ts = zettel_to_epoch('202411030159')
//   const date = new Date(ts)
//   t.equal(date.getHours(), 1, 'Should parse hour correctly at DST boundary')
//   t.end()
// })

test('DST Boundary - ET Fall Back Hour (agnostic)', t => {
  const ts = zettel_to_epoch('202411030159')
  const dt = DateTime.fromMillis(ts, { zone: 'America/New_York' })

  t.equal(dt.hour, 1, 'Should parse hour correctly at DST boundary in ET')
  t.end()
})
