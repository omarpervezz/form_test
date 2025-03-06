export interface TableDataType {
  // FlightBooking properties
  id?: number;
  issueDate?: string;
  bookingDate?: string;
  bookingID?: string;
  passengerName?: string;
  flightDate?: string;
  route?: string;
  ticketNumber?: string;
  totalPrice?: string;
  status?: string;
  pnr?: string;

  // PassengerData properties
  address?: string;
  lastName?: string;
  email?: string;
  firstName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  actionPrimaryLabel?: string;

  // TransactionData properties
  transectionId?: string;
  trxDate?: string;

  // PaymentData properties
  paymentDate?: string;
  accountNumber?: string;
  accountName?: string;
  paymentType?: string;
  accountType?: string;
  transactionNumber?: string;
}