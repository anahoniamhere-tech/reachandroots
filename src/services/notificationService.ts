export const NotificationService = {
  async sendOrderConfirmation(email: string, orderId: string) {
    console.log(`[EmailService] Sending confirmation to ${email} for order ${orderId}`);
    // In production, use SendGrid, Postmark, etc.
    return { success: true };
  },

  async sendTicketQR(email: string, qrData: string) {
    console.log(`[EmailService] Sending QR Ticket to ${email}`);
    return { success: true };
  }
};
