export const PaymentService = {
  async createCheckoutSession(orderData: {
    tierId: string;
    quantity: number;
    day: string;
    buyerInfo: { fullName: string; email: string };
  }) {
    const response = await fetch("/api/checkout/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Checkout failed");
    }

    return response.json();
  }
};
