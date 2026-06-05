# Security Specification for Roots & Reach Ticketing

## Data Invariants
1. A ticket order cannot be created with a quantity > 10.
2. VIP orders require `dietaryPreference` and `welcomeKitName`.
3. Inventory must decrement on purchase; orders must not exceed inventory.
4. `tierId` and `day` must match a valid `TicketTier` and `EventDay`.

## The Dirty Dozen Payloads
1. **Price Spoofing**: Attempt to buy a VIP ticket for $1.
2. **Infinite Inventory**: Attempt to buy 1,000,000 tickets.
3. **Status Hijack**: Create an order pre-marked as `status: 'paid'` without a payment gateway.
4. **Identity Theft**: Access another user's digital ticket by guessing the `orderId`.
5. **Shadow Updates**: Add a `isVerified: true` field to a user profile.
6. **Negative Quantity**: Attempt to buy -1 tickets to "refund" money.
7. **Orphaned Order**: Create an order for a non-existent `tierId`.
8. **Admin Bypass**: Write to `ticketTiers` without an admin token.
9. **Spam Waitlist**: Sign up 1,000 times for the same email.
10. **Day Tampering**: Buy a $20 ticket but mark it as a 3rd day VIP experience.
11. **PII Leak**: Query all emails in the `orders` collection.
12. **Future Date Injection**: Set `createdAt` to a year in the future.

## Test Runner (Draft)
```typescript
// firestore.rules.test.ts (logic check)
test("Cannot create order with negative quantity", async () => {
  await assertFails(addDoc(collection(db, "orders"), { quantity: -1 }));
});
```
