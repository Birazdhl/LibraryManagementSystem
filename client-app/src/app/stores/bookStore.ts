import { observable, action, computed, runInAction } from "mobx";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { IBooks } from "../models/books";

export default class BookStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable bookRegistry = new Map();
  @observable book: IBooks | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get getAvailableBooks() {
    return Array.from(this.bookRegistry.values());
  }

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
      });
    } catch (error) {
      runInAction("load books error", () => {
        this.loadingInitial = false;
      });
    }
  };
}
