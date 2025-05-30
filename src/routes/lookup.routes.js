const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const lookupController = require('../controllers/lookup.controller');
const { validateRequest } = require('../middleware/validator');

const lookupValidation = [
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+[1-9]\d{1,14}$/)
    .withMessage('Phone number must be in E.164 format (e.g., +2348012345678)'),
  body('lookupType')
    .notEmpty()
    .withMessage('Lookup type is required')
    .isIn(['free', 'hlr'])
    .withMessage('Lookup type must be either "free" or "hlr"'),
  validateRequest
];

/**
 * @swagger
 * /api/lookup:
 *   post:
 *     summary: Look up a phone number using either free or HLR verification
 *     tags: [Phone Number Lookup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - lookupType
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to look up
 *                 example: "+2348012345678"
 *               lookupType:
 *                 type: string
 *                 description: Type of lookup to perform (free or hlr)
 *                 enum: [free, hlr]
 *                 example: "free"
 *     responses:
 *       200:
 *         description: Phone number lookup successful
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   description: Free lookup response
 *                   properties:
 *                     phone:
 *                       type: string
 *                       example: "+2348012345678"
 *                     country:
 *                       type: string
 *                       example: "NG"
 *                     nationalNumber:
 *                       type: string
 *                       example: "8012345678"
 *                     carrierCode:
 *                       type: string
 *                       example: "MTN"
 *                 - type: object
 *                   description: HLR lookup response
 *                   properties:
 *                     phone:
 *                       type: string
 *                       example: "+2348012345678"
 *                     network:
 *                       type: string
 *                       example: "MTN"
 *                     country:
 *                       type: string
 *                       example: "NG"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     ported:
 *                       type: boolean
 *                       example: false
 *                     reachable:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid phone number or lookup type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Phone number must be in E.164 format"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error in lookup verification"
 */
router.post('/', lookupValidation, lookupController.lookup);

module.exports = router;