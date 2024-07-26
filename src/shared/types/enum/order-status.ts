export enum PaymentStatus {
  noPay = 'noPay',
  pendingToPay = 'pendingToPay',
  paid = 'paid',
}

export enum PaymentType {
  cash = 'cash',
  trasfer = 'trasfer',
  mercadopago = 'mercadopago',
}

export enum ShippingStatus {
  toPack = 'toPack',
  toSend = 'toSend',
  sent = 'sent',
  delivered = 'delivered',
}

export enum DeliveryStatus {
  toPack = 'toPack',
  readyToPickUp = 'readyToPickUp',
  delivered = 'delivered',
}
