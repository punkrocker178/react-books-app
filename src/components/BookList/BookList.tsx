import React, { Component } from 'react';
import axios from 'axios';
import styles from './BookList.module.css';
import BookItem from '../BookItem/BookItem';
import SearchComponent from '../Search/Search';

interface BookVolumes {
  items: any[];
  kind: string;
  totalItems: number;
}

class BookList extends Component<{}, {
  booksCollection: BookVolumes,
  isLoading: boolean,
  startIndex: number,
  search: string
}> {

  readonly API_KEY = 'AIzaSyD06ROqqvFrC90kOAWd7zQG3Zm8v9jdsJo';

  axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com'
  });

  render() {
    let bookListView =
      <div>
				<SearchComponent></SearchComponent>

        <div>
          <input type="text"
            value={this.state.search}
            name="searchBooks"
            onChange={this.onInputChange}></input>
          <button onClick={this.search}>Search</button>
        </div>

        {
          this.state.booksCollection.totalItems > 0 ?
            <div>
              <div className={styles.container}>{
                this.state.booksCollection.items.map((book, index: number) => {
                  return <BookItem book={book} key={index}></BookItem>
                })
              }
              </div>
              <button onClick={this.loadMore}>Load more</button>
            </div> : null
        }


        {
          this.state.isLoading ?
            <div>
              <span>Loading...</span>
            </div> : null
        }

      </div>

    return bookListView;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      startIndex: 0,
      isLoading: false,
      booksCollection: {
        items: [],
        kind: '',
        totalItems: 0
      },
      search: ''
    };
    this.loadMore = this.loadMore.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {

  }

  // Functional programming & closure

  getRequest(options: any) {
    this.setState({
      isLoading: true
    });

    let reqOptions = options;
    return (params: any) => this.axiosInstance.request({ ...reqOptions, ...params });
  }

  getBooks(params: any) {
    const req = this.getRequest(
      {
        url: '/books/v1/volumes',
        method: 'get',
      });

    return req(params);
  }

  updateData = (res: any) => {
    const newBookCollection: BookVolumes = {
      items: [...this.state.booksCollection.items, ...res.data.items],
      kind: res.data.kind,
      totalItems: this.state.booksCollection.totalItems + res.data.totalItems
    };
    this.setState({
      isLoading: false,
      booksCollection: newBookCollection
    });
  }

  onInputChange(event: any) {
    this.setState({
      search: event.target.value
    })
  }

  search() {
    const request = async () => {
      const res = await this.getBooks({
        params: {
          q: `inauthor:${this.state.search}`,
          key: this.API_KEY,
          startIndex: this.state.startIndex,
          maxResults: 20
        }
      });

      this.updateData(res);
    };

    request();
  }

  loadMore() {
    const request = async () => {

      const res = await this.getBooks({
        params: {
          q: `inauthor:${this.search}`,
          key: this.API_KEY,
          startIndex: this.state.startIndex,
          maxResults: 20
        }
      });

      this.updateData(res);
    }

    this.setState({
      startIndex: this.state.startIndex + 20
    }, request);
  }



}
export default BookList;