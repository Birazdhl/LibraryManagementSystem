export interface IBookRequestStatus {
  bookid: number;
  userid: string;
  requestCancelBook: string;
}

export interface IRequestReject {
  id: number;
  bookname: string;
  approveorreject: string;
  returndate: number;
  name: string;
  emailAddress: string;
}
