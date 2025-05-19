const { DateTime } = require('luxon')
const cityTimezones = require('city-timezones')

const zettel_to_epoch = (x, c = 'Boston') => {
  const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?$/;
  const match = x.match(regex);

  if (!match) {
    throw new Error(`Invalid Zettel ID format: ${x}`);
  }

  const [ , year, month, day, hour, minute, second = '00' ] = match;
  let tz = ''

  if (/^(utc|gmt|z)$/i.test(c)) tz = 'UTC'

  const cityLookup = cityTimezones.findFromCityStateProvince(c).sort((a, b) => b.pop - a.pop)
  if (!cityLookup || cityLookup.length === 0) {
    console.warn(`⚠️ Could not resolve timezone for "${c}", defaulting to UTC`)
    tz = 'UTC'
  } else {
    tz = cityLookup[0].timezone
  }

  // for invalid/ouut of range, console.log():
  // DateTime object: DateTime { Invalid, reason: unit out of range }
  // .toMillis():     NaN
  return DateTime.fromFormat(`${year}${month}${day}${hour}${minute}${second}`, 'yyyyMMddHHmmss', { zone: tz }).toMillis()
}

// const testResults = cityTimezones.findFromCityStateProvince(null)
// const sorted = testResults.sort((a, b) => b.pop - a.pop)
// // console.log(testResults.map(c => `${c.city}, ${c.country} - ${c.timezone}`));
// console.dir(sorted)

module.exports = {
  zettel_to_epoch
}
