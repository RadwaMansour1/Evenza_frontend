export interface TransferInfo {
  organizerId: string;
  type: 'E-Wallet' | 'InstaPay' | 'Bank';
  accountNumber?: string;
  accountName?: string;
  walletPhoneNumber?: string;
  email?: string;
}

export interface TransferInfoResponse {
  timestamp: string;
  data: TransferInfo;
}
