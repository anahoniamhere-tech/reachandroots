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
   * Returns calculated QR endpoint (Backend would serve this)
   */
  getQRUrl(orderId: string): string {
    return `/api/tickets/qr/${orderId}`;
  }
};
