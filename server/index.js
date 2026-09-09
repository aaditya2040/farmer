/**
 * KisanSetu - Backend API Server for MSG91 Integration
 * Keeps MSG91 Authkey securely on server-side.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { msg91 } from './msg91Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API ${req.method}] ${req.path}`);
  }
  next();
});

/**
 * Endpoint to check MSG91 connection status (does NOT leak the secret key)
 */
app.get('/api/msg91/status', (req, res) => {
  res.json({
    configured: msg91.isConfigured(),
    senderId: msg91.senderId,
    hasOtpTemplate: Boolean(msg91.otpTemplateId && !msg91.otpTemplateId.includes('YOUR_')),
    hasSlotTemplate: Boolean(msg91.slotTemplateId && !msg91.slotTemplateId.includes('YOUR_')),
    hasQueueTemplate: Boolean(msg91.queueTemplateId && !msg91.queueTemplateId.includes('YOUR_')),
    mode: msg91.isConfigured() ? 'live' : 'simulation',
  });
});

/**
 * 1. Send OTP to Mobile
 */
app.post('/api/otp/send', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: 'Mobile number is required' });
    }

    const result = await msg91.sendOtp(mobileNumber);
    return res.json(result);
  } catch (error) {
    console.error('Error in /api/otp/send:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while sending OTP' });
  }
});

/**
 * 2. Verify OTP
 */
app.post('/api/otp/verify', async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    if (!mobileNumber || !otp) {
      return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });
    }

    const result = await msg91.verifyOtp(mobileNumber, otp);
    return res.json(result);
  } catch (error) {
    console.error('Error in /api/otp/verify:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while verifying OTP' });
  }
});

/**
 * 3. Resend OTP
 */
app.post('/api/otp/retry', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    if (!mobileNumber) {
      return res.status(400).json({ success: false, message: 'Mobile number is required' });
    }

    const result = await msg91.retryOtp(mobileNumber);
    return res.json(result);
  } catch (error) {
    console.error('Error in /api/otp/retry:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while resending OTP' });
  }
});

/**
 * 4. Slot Booking Confirmation SMS
 */
app.post('/api/sms/slot-confirmation', async (req, res) => {
  try {
    const { mobile, farmerName, tokenNumber, centreName, bookingDate, timeSlot, cropName } = req.body;
    const result = await msg91.sendSlotConfirmationSms({
      mobile,
      farmerName: farmerName || 'Farmer',
      tokenNumber: tokenNumber || 'TOKEN A-127',
      centreName: centreName || 'APMC Centre',
      bookingDate: bookingDate || 'Today',
      timeSlot: timeSlot || '10:00 AM - 11:00 AM',
      cropName: cropName || 'Agricultural Produce',
    });
    return res.json(result);
  } catch (error) {
    console.error('Error in /api/sms/slot-confirmation:', error);
    return res.status(500).json({ success: false, message: 'Failed to dispatch slot SMS' });
  }
});

/**
 * 5. Queue Position Alert SMS
 */
app.post('/api/sms/queue-alert', async (req, res) => {
  try {
    const { mobile, farmerName, tokenNumber, tokensAhead, centreName, gateName } = req.body;
    const result = await msg91.sendQueueAlertSms({
      mobile,
      farmerName: farmerName || 'Farmer',
      tokenNumber: tokenNumber || 'A-127',
      tokensAhead: tokensAhead ?? 4,
      centreName: centreName || 'APMC Centre',
      gateName: gateName || 'Gate No. 2',
    });
    return res.json(result);
  } catch (error) {
    console.error('Error in /api/sms/queue-alert:', error);
    return res.status(500).json({ success: false, message: 'Failed to dispatch queue SMS' });
  }
});

// Start Express server if run directly from CLI
const isDirectRun = process.argv[1] && (
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) ||
  process.argv[1].endsWith('server' + path.sep + 'index.js') ||
  process.argv[1].endsWith('server/index.js')
);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌾 KisanSetu MSG91 Backend API Server running on port ${PORT}`);
    console.log(`🔒 MSG91 Authkey Configured: ${msg91.isConfigured() ? 'YES (Live Mode)' : 'NO (Simulation / Demo Mode)'}`);
    console.log(`====================================================`);
  });
}

export { app };
export default app;
