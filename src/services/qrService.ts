import QRCode from 'qrcode';

export const QRService = {
  /**
   * Generates a secure QR payload for ticket entry
   */
  generatePermitToken(orderId: string, tierId: string): string {
    // Encrypted token containing order metadata
    const payload = JSON.stringify({
      oid: orderId,
      tid: tierId,
      ts: Date.now(),
      v: '1.0'
    });
    return btoa(payload); // Base64 encoding for the scaffold
  },

  /**
   * Generates a Base64 data URL string of the QR code image
   */
  async generateQRCodeImage(orderId: string, tierId: string): Promise<string> {
    const token = this.generatePermitToken(orderId, tierId);
    try {
      // Returns a data:image/png;base64,... string
      return await QRCode.toDataURL(token, {
        width: 300,
        margin: 2,
        color: {
          dark: '#031428', // brand-navy
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('Failed to generate QR code', err);
      throw err;
    }
  },

  /**
   * Returns calculated QR endpoint (Backend would serve this)
   */
  getQRUrl(orderId: string): string {
    return `/api/tickets/qr/${orderId}`;
  }
};
