# Firebase Security Specification - Midowga Dhalinyarada Calas

## Data Invariants
1. A registration must have all required fields.
2. Blood type must be one of the 8 standard types.
3. `qaraan` must be a non-negative number.
4. `createdAt` must be the server time.
5. Only an admin can read, update, or delete registrations.
6. Anyone can create a registration.

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Spoofing**: Attempt to create a registration with a future `createdAt`.
2. **Resource Poisoning**: Large string for `fullName`.
3. **Privilege Escalation**: Attempt to read the `/registrations` collection as a non-admin.
4. **Invalid Enum**: `bloodType` = "XYZ".
5. **Missing Field**: Create registration without `email`.
6. **Type Mismatch**: `qaraan` = "none".
7. **Negative Value**: `qaraan` = -1.
8. **Malicious Update**: Non-admin attempting to update a registration's `bloodType`.
9. **Delete Attempt**: Non-admin attempting to delete a registration.
10. **Shadow Field**: Adding `isAdmin: true` to a registration.
11. **Path Poisoning**: Document ID with junk characters.
12. **PII Leak**: Unauthorized access to `/registrations` list.

## Test Strategy
- Test `create` for anyone.
- Test `read/write` for admin (`haaruunhassan4737@gmail.com`).
- Test `read/write` rejection for non-admin.
