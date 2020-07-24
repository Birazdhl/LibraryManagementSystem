import { observable, action, computed, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IBooks, IBookNameAndId } from "../models/books";
import { history } from "../..";
import { toast } from "react-toastify";
import { SyntheticEvent } from "react";
import userStore from "../../app/stores/userStore";
import { IBookRequestStatus, IRequestReject } from "../models/bookStatus";

export default class BookStore {
  rootStore: RootStore;
  storeUser: userStore;
  constructor(rootStore: RootStore, storeUser: userStore) {
    this.rootStore = rootStore;
    this.storeUser = storeUser;
  }

  @observable bookRegistry = new Map();
  @observable book: IBooks | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable status = "requested";
  @observable sserBookListValue = "taken";

  // @computed get getAvailableAndRequestedBooks() {
  //   var bookList = Array.from(this.bookRegistry.values());
  //   console.log(bookList);
  //   var list = bookList.filter(
  //     (data) =>
  //       data.isAvailable == true ||
  //       data.requestedBy === this.storeUser.user!.username ||
  //       data.name === this.storeUser.user!.username
  //   );
  //   return list;
  // }

  @computed get filterValues() {
    if (this.status === "all") {
      return Array.from(this.bookRegistry.values());
    } else if (this.status === "requested") {
      var bookList = Array.from(this.bookRegistry.values());
      var list = bookList.filter((data) => data.isRequested == true);
      return list;
    } else if (this.status === "available") {
      var bookList = Array.from(this.bookRegistry.values());
      var list = bookList.filter((data) => data.isAvailable == true);
      return list;
    } else {
      var bookList = Array.from(this.bookRegistry.values());
      var list = bookList.filter((data) => data.isTaken == true);
      return list;
    }
  }

  @action setStatus = (status: string) => {
    this.status = status;
  };

  @action loadBooks = async () => {
    this.loadingInitial = true;
    try {
      const books = await agent.Books.list();
      runInAction("loading books", () => {
        books.forEach((books) => {
          books.issuedOn = new Date(books.issuedOn);
          this.bookRegistry.set(books.id, books);
        });
        this.loadingInitial = false;
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("load books error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action createBook = async (book: string) => {
    this.submitting = true;
    try {
      await agent.Books.create(book);
      runInAction("create book", () => {
        this.loadBooks();
        this.submitting = false;
      });
      history.push(`/manageBooks`);
    } catch (error) {
      runInAction("create book error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action loadBook = async (id: number) => {
    let book = this.getBook(id);
    if (book) {
      this.book = book;
      return book;
    } else {
      this.loadingInitial = true;
      try {
        book = await agent.Books.details(id);
        runInAction("getting book", () => {
          this.book = book;
          this.bookRegistry.set(book.id, book);
          this.loadingInitial = false;
        });
        return book;
      } catch (error) {
        runInAction("get book error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getBook = (id: number) => {
    return this.bookRegistry.get(id);
  };

  @action editBook = async (book: IBookNameAndId) => {
    this.submitting = true;
    try {
      await agent.Books.update(book);
      runInAction("editing books", () => {
        this.loadBooks();
        this.submitting = false;
      });
      history.push(`/manageBooks`);
      toast.success("Book name changed successfully");
    } catch (error) {
      runInAction("edit book error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error);
    }
  };

  @action deleteBook = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Books.delete(id);
      runInAction("deleting book", () => {
        this.bookRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete book error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action requestCancelBook = async (
    event: SyntheticEvent<HTMLButtonElement>,
    requestType: string,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      var bookStatus: IBookRequestStatus = {
        bookid: id,
        userid: this.storeUser.user!.userId,
        requestCancelBook: requestType,
      };
      await agent.BookStatus.sendRequest(bookStatus);
      runInAction("request book", () => {
        this.loadBooks();
      });
    } catch (error) {
      runInAction("request book error", () => {
        this.submitting = false;
        this.target = "";
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action approveRejectRequests = async (
    event: SyntheticEvent<HTMLButtonElement>,
    books: IRequestReject
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    console.log(books);
    try {
      await agent.BookStatus.approveRejectRequest(books);
      runInAction("Approve Reject book", () => {
        this.loadBooks();
      });
    } catch (error) {
      runInAction("Approve Reject book error", () => {
        this.submitting = false;
        this.target = "";
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };

  @action returnSubmittedBook = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.BookStatus.bookSubmitedByUser(id);
      runInAction("Submit  book", () => {
        this.loadBooks();
      });
    } catch (error) {
      runInAction("Submit  book error", () => {
        this.submitting = false;
        this.target = "";
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };
}
