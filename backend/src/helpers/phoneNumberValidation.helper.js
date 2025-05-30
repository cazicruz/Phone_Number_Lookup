const { parsePhoneNumberFromString } = require('libphonenumber-js');

function validateAndFormatPhoneNumber(rawPhone) {
  try {
    const phoneNumber = parsePhoneNumberFromString(rawPhone);
    if (phoneNumber && phoneNumber.isValid()) {
      return {
        valid: true,
        number: phoneNumber.number,         // E.164 format
        country: phoneNumber.country,       // 'US', 'NG', etc.
        nationalNumber: phoneNumber.nationalNumber,
        carrierCode: phoneNumber.carrierCode || null
      };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

module.exports = { validateAndFormatPhoneNumber };