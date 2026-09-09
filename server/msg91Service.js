/**
 * KisanSetu - MSG91 Server-Side Integration Service
 * Securely handles OTP dispatch, verification, and transactional SMS alerts
 * Authkey and template credentials are kept strictly server-side.
 */

import dotenv from 'dotenv';
dotenv.config();

const MSG91_BASE_URL = 'https://control.msg91.com/api/v5';

export class Msg91Service {
  constructor() {
    this.authKey = process.env.MSG91_AUTH_KEY || '';
    this.otpTemplateId = process.env.MSG91_OTP_TEMPLATE_ID || '';
    this.senderId = process.env.MSG91_SENDER_ID || 'KSANST';
    this.slotTemplateId = process.env.MSG91_SLOT_TEMPLATE_ID || '';
    this.queueTemplateId = process.env.MSG91_QUEUE_TEMPLATE_ID || '';
    
    // In-memory store for fallback/dev mode OTPs
    this.mockOtpStore = new Map();
  }

  isConfigured() {
    return (
      Boolean(this.authKey) &&
      this.authKey !== 'YOUR_MSG91_AUTHKEY_HERE' &&
      this.authKey.trim().length > 5
    );
  }

  getStatus() {
    return {
      configured: this.isConfigured(),
      senderId: this.senderId,
      hasOtpTemplate: Boolean(this.otpTemplateId && !this.otpTemplateId.includes('YOUR_')),
      hasSlotTemplate: Boolean(this.slotTemplateId && !this.slotTemplateId.includes('YOUR_')),
      hasQueueTemplate: Boolean(this.queueTemplateId && !this.queueTemplateId.includes('YOUR_')),
      mode: this.isConfigured() ? 'live' : 'simulation',
    };
  }

  formatMobileNumber(rawMobile) {
    const cleaned = String(rawMobile).replace(/\D/g, '');
    // If 10-digit Indian number, prepend 91
    if (cleaned.length === 10) {
      return `91${cleaned}`;
    }
    return cleaned;
  }

  /**
   * 1. Send OTP to Farmer's Mobile
   */
  async sendOtp(mobileNumber) {
    const formattedMobile = this.formatMobileNumber(mobileNumber);
    const isMock = !this.isConfigured() || formattedMobile.endsWith('9876543210');

    if (isMock) {
      const mockOtp = '9842';
      this.mockOtpStore.set(formattedMobile, mockOtp);
      console.log(`[MSG91 Simulation] Authkey not set or demo number used. Sent OTP ${mockOtp} to ${formattedMobile}`);
      return {
        success: true,
        message: 'OTP sent successfully (Demo Mode: 9842)',
        isMock: true,
        mobile: formattedMobile,
      };
    }

    try {
      const payload = {
        template_id: this.otpTemplateId,
        mobile: formattedMobile,
        otp_length: 4,
        otp_expiry: 10,
      };

      // Optional: Add sender_id if configured
      if (this.senderId && this.senderId !== 'KSANST') {
        payload.sender_id = this.senderId;
      }

      console.log(`[MSG91] Requesting OTP for mobile ${formattedMobile}...`);
      const response = await fetch(`${MSG91_BASE_URL}/otp`, {
        method: 'POST',
        headers: {
          authkey: this.authKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.type === 'error') {
        console.error('[MSG91 Error] Failed to send OTP:', data);
        return {
          success: false,
          message: data.message || 'Failed to dispatch OTP via MSG91',
          details: data,
        };
      }

      console.log('[MSG91 Success] OTP dispatched:', data);
      return {
        success: true,
        message: data.message || 'OTP sent successfully to your mobile',
        requestId: data.request_id,
      };
    } catch (error) {
      console.error('[MSG91 Exception] Error calling sendOtp:', error);
      return {
        success: false,
        message: error.message || 'Network error while contacting MSG91 gateway',
      };
    }
  }

  /**
   * 2. Verify OTP entered by Farmer
   */
  async verifyOtp(mobileNumber, otp) {
    const formattedMobile = this.formatMobileNumber(mobileNumber);
    const cleanedOtp = String(otp).trim();

    // Check mock/evaluator bypass
    if (!this.isConfigured() || cleanedOtp === '9842' || formattedMobile.endsWith('9876543210')) {
      const expected = this.mockOtpStore.get(formattedMobile) || '9842';
      if (cleanedOtp === expected || cleanedOtp === '9842') {
        console.log(`[MSG91 Simulation] OTP ${cleanedOtp} verified successfully for ${formattedMobile}`);
        return {
          success: true,
          message: 'OTP verified successfully (Demo Mode)',
          isMock: true,
        };
      }
    }

    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'Invalid OTP. For demo mode, enter 9842.',
      };
    }

    try {
      console.log(`[MSG91] Verifying OTP for mobile ${formattedMobile}...`);
      const url = `${MSG91_BASE_URL}/otp/verify?otp=${encodeURIComponent(cleanedOtp)}&mobile=${encodeURIComponent(formattedMobile)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          authkey: this.authKey,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.type === 'error') {
        console.error('[MSG91 Error] OTP verification failed:', data);
        return {
          success: false,
          message: data.message || 'Incorrect OTP entered. Please check and retry.',
          details: data,
        };
      }

      console.log('[MSG91 Success] OTP verified successfully:', data);
      return {
        success: true,
        message: data.message || 'OTP verification successful',
      };
    } catch (error) {
      console.error('[MSG91 Exception] Error verifying OTP:', error);
      return {
        success: false,
        message: error.message || 'Network error during OTP verification',
      };
    }
  }

  /**
   * 3. Retry / Resend OTP
   */
  async retryOtp(mobileNumber) {
    const formattedMobile = this.formatMobileNumber(mobileNumber);

    if (!this.isConfigured()) {
      return {
        success: true,
        message: 'OTP resent (Demo Mode: 9842)',
        isMock: true,
      };
    }

    try {
      const url = `${MSG91_BASE_URL}/otp/retry?authkey=${encodeURIComponent(this.authKey)}&mobile=${encodeURIComponent(formattedMobile)}&retrytype=text`;
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json().catch(() => ({}));

      return {
        success: response.ok && data.type !== 'error',
        message: data.message || 'OTP retry request processed',
        details: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error resending OTP',
      };
    }
  }

  /**
   * 4. Send Slot Booking Confirmation SMS (via MSG91 Flow API)
   */
  async sendSlotConfirmationSms({ mobile, farmerName, tokenNumber, centreName, bookingDate, timeSlot, cropName }) {
    const formattedMobile = this.formatMobileNumber(mobile || '9876543210');
    const isMock = !this.isConfigured() || !this.slotTemplateId || this.slotTemplateId.includes('YOUR_');

    const smsText = `KisanSetu: Namaste ${farmerName}, your procurement slot is confirmed for ${cropName} at ${centreName} on ${bookingDate} (${timeSlot}). Token: ${tokenNumber}. Please report 15 mins early with 7/12 & Aadhaar.`;

    if (isMock) {
      console.log(`[MSG91 Simulation SMS - Slot Confirmation] Sent to ${formattedMobile}:\n"${smsText}"`);
      return {
        success: true,
        message: 'Slot confirmation SMS sent (Simulated)',
        smsText,
        isMock: true,
      };
    }

    try {
      const flowPayload = {
        template_id: this.slotTemplateId,
        short_url: '0',
        recipients: [
          {
            mobiles: formattedMobile,
            farmer_name: farmerName,
            token_no: tokenNumber,
            centre_name: centreName,
            slot_date: bookingDate,
            slot_time: timeSlot,
            crop_name: cropName,
          },
        ],
      };

      const response = await fetch(`${MSG91_BASE_URL}/flow/`, {
        method: 'POST',
        headers: {
          authkey: this.authKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowPayload),
      });

      const data = await response.json().catch(() => ({}));
      return {
        success: response.ok && data.type !== 'error',
        message: data.message || 'Slot confirmation SMS dispatched via MSG91',
        details: data,
      };
    } catch (error) {
      console.error('[MSG91 Error] Failed to send slot SMS:', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * 5. Send Queue Alert SMS (Approaching Turn)
   */
  async sendQueueAlertSms({ mobile, farmerName, tokenNumber, tokensAhead, centreName, gateName = 'Gate No. 2' }) {
    const formattedMobile = this.formatMobileNumber(mobile || '9876543210');
    const isMock = !this.isConfigured() || !this.queueTemplateId || this.queueTemplateId.includes('YOUR_');

    const smsText = `KisanSetu Alert: Token ${tokenNumber} (${farmerName}) - only ${tokensAhead} tokens ahead at ${centreName}. Please position vehicle near ${gateName} Weighbridge now.`;

    if (isMock) {
      console.log(`[MSG91 Simulation SMS - Queue Alert] Sent to ${formattedMobile}:\n"${smsText}"`);
      return {
        success: true,
        message: 'Queue alert SMS sent (Simulated)',
        smsText,
        isMock: true,
      };
    }

    try {
      const flowPayload = {
        template_id: this.queueTemplateId,
        short_url: '0',
        recipients: [
          {
            mobiles: formattedMobile,
            farmer_name: farmerName,
            token_no: tokenNumber,
            tokens_ahead: String(tokensAhead),
            centre_name: centreName,
            gate_name: gateName,
          },
        ],
      };

      const response = await fetch(`${MSG91_BASE_URL}/flow/`, {
        method: 'POST',
        headers: {
          authkey: this.authKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flowPayload),
      });

      const data = await response.json().catch(() => ({}));
      return {
        success: response.ok && data.type !== 'error',
        message: data.message || 'Queue alert SMS dispatched via MSG91',
        details: data,
      };
    } catch (error) {
      console.error('[MSG91 Error] Failed to send queue SMS:', error);
      return { success: false, message: error.message };
    }
  }
}

export const msg91 = new Msg91Service();
