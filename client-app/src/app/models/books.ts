export interface IBooks {
  id: number;
  bookname: string;
  issuedOn: Date;
  returnDate: Date;
  isReturned: boolean;
  isRequested: boolean;
  isAvailable: boolean;
  isTaken: boolean;
  name: string;
  requestedBy: string;
}

export interface IBookNameAndId {
  id: number;
  bookname: string;
}
