const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Number Lookup API',
      version: '1.0.0',
      description: 'API documentation for the Number Lookup application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        PhoneNumberLookup: {
          type: 'object',
          required: ['phoneNumber'],
          properties: {
            phoneNumber: {
              type: 'string',
              description: 'The phone number to look up',
              example: '+2348012345678'
            },
            countryCode: {
              type: 'string',
              description: 'The country code for the phone number',
              example: 'NG'
            },
            isValid: {
              type: 'boolean',
              description: 'Whether the phone number is valid'
            },
            type: {
              type: 'string',
              description: 'The type of phone number (mobile, fixed-line, etc.)',
              example: 'MOBILE'
            },
            carrier: {
              type: 'string',
              description: 'The carrier/service provider',
              example: 'MTN'
            },
            region: {
              type: 'string',
              description: 'The region/area of the phone number',
              example: 'Lagos'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error message'
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 