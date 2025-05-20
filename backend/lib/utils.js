const { DateTime } = require('luxon')
const cityTimezones = require('city-timezones')

const zettel_to_epoch = (x, c) => {
  const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?$/
  const match = x.match(regex)

  if (!match) {
    throw new Error(`Invalid Zettel ID format: ${x}`)
  }

  const [ , year, month, day, hour, minute, second = '00' ] = match
  let tz = ''

  // Sanitize empty string to default
  c = c || 'Boston'

  if (/^(utc|gmt|z)$/i.test(c)) {
    console.warn(`ℹ️ User supplied "${c}", normalizing to UTC`)
    tz = 'UTC'
  } else {
    const cityLookup = cityTimezones.findFromCityStateProvince(c).sort((a, b) => b.pop - a.pop)
    if (!cityLookup || cityLookup.length === 0) {
      console.warn(`⚠️ Could not resolve timezone for "${c}", defaulting to UTC`)
      tz = 'UTC'
    } else {
      tz = cityLookup[0].timezone
      console.warn(`ℹ️ User supplied "${c}", using timezone "${tz}"`)
    }
  }

  // for invalid/ouut of range, console.log():
  // DateTime object: DateTime { Invalid, reason: unit out of range }
  // .toMillis():     NaN
  return DateTime.fromFormat(`${year}${month}${day}${hour}${minute}${second}`, 'yyyyMMddHHmmss', { zone: tz }).toMillis()
}

module.exports = {
  zettel_to_epoch
}
