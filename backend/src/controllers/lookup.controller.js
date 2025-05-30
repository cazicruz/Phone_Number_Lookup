const asyncHandler = require('express-async-handler');
const lookupService = require('../services/lookup.service');
const { validateAndFormatPhoneNumber } = require('../helpers/phoneNumberValidation.helper');

const lookup = asyncHandler(async (req, res) => {
  const { phoneNumber, lookupType } = req.body;
  const { valid, number, country, nationalNumber, carrierCode } = validateAndFormatPhoneNumber(phoneNumber);

  if (!valid) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }


  if (lookupType === 'free') {
    const response = await lookupService.freeLookupVerification(number);
    return res.json({
      success: true,
      data: response
    });
  } else if (lookupType === 'hlr') {
    const response = await lookupService.hlrLookupVerification(number);
    return res.json({
      success: true,
      data: {
        phone: response.phone,
        network: response.network,
        country: response.country,
        status: response.status,
        ported: response.ported,
        reachable: response.reachable,
      }
    });
  }
  return res.status(400).json({ error: 'Invalid lookup type' });
});

module.exports = { lookup };