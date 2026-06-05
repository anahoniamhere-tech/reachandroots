export const ValidationSchemas = {
  /**
   * Order validation logic (scaffold for Zod or similar)
   */
  validateOrder(data: any) {
    const errors: string[] = [];
    
    if (!data.buyerInfo.fullName || data.buyerInfo.fullName.length < 3) {
      errors.push("Full name must be provided (min 3 chars)");
    }
    
    if (!data.buyerInfo.email || !data.buyerInfo.email.includes('@')) {
      errors.push("A valid digital identity (email) is required");
    }

    if (data.isVip && (!data.vipDetails.welcomeKitName)) {
      errors.push("VIP monogram is required for physical credentials");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
