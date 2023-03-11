export const PaymentLinkStatus = {
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED'
}

// eslint-disable-next-line no-redeclare
export type PaymentLinkStatus =
    typeof PaymentLinkStatus[keyof typeof PaymentLinkStatus];
