import React, { Component } from 'react';
import axios from 'axios';
import styles from './BookList.module.css';
import BookItem from '../BookItem/BookItem';
import SearchComponent from '../Search/Search';
import { SearchData } from '../../models/SearchData.interface';

interface BookVolumes {
	items: any[];
	kind: string;
	totalItems: number;
}

class BookList extends Component<{}, {
	booksCollection: BookVolumes,
	errorMsg: string,
	isLoading: boolean,
	startIndex: number,
	searchTerm: string
}> {

	readonly API_KEY = 'AIzaSyD06ROqqvFrC90kOAWd7zQG3Zm8v9jdsJo';

	axiosInstance = axios.create({
		baseURL: 'https://www.googleapis.com'
	});

	render() {
		let bookListView =
			<div>
				<h5 className="mt-2">Search your favorite books</h5>

				<SearchComponent searchCallback={this.searchCallBack}></SearchComponent>

				{
					this.state.booksCollection.totalItems > 0 ?
						<div className={styles.container}>{
							this.state.booksCollection.items.map((book, index: number) => {
								return <BookItem book={book} key={index}></BookItem>
							})
						}
						</div> : null
				}

				{
					this.state.booksCollection.totalItems > 0 && !this.state.isLoading ?
						<button onClick={this.loadMore}>Load more</button> : null
				}

				{
					this.state.isLoading ?
						<div>
							<span>Loading...</span>
						</div> : null
				}

				{
					this.state.errorMsg ?
						<div>
							<h5>{this.state.errorMsg}</h5>
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
			errorMsg: '',
			booksCollection: {
				items: [],
				kind: '',
				totalItems: 0
			},
			searchTerm: ''
		};
		this.searchCallBack = this.searchCallBack.bind(this);
		this.loadMore = this.loadMore.bind(this);
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

		try {
			if (res.data.totalItems === 0) {
				throw Error('Results not found');
			}

			const newBookCollection: BookVolumes = {
				items: [...this.state.booksCollection.items, ...res.data.items],
				kind: res.data.kind,
				totalItems: this.state.booksCollection.totalItems + res.data.totalItems
			};
			this.setState({
				isLoading: false,
				booksCollection: newBookCollection
			});

		} catch (err: any) {
			this.setState({
				isLoading: false,
				errorMsg: err.message
			});
		}

	}

	searchCallBack(searchData: SearchData) {
		let searchTerm = '';
		let isSingleSearch = false;

		if (searchData.searchTitle) {
			searchTerm += `intitle:${searchData.searchTitle}`;
		}

		if (searchData.searchAuthor) {
			isSingleSearch = !(!!searchData.searchTitle || !!searchData.searchPublisher);
			searchTerm += `${!isSingleSearch ? '+' : ''}inauthor:${searchData.searchAuthor}`;
		}

		if (searchData.searchPublisher) {
			isSingleSearch = !(!!searchData.searchTitle || !!searchData.searchAuthor);
			searchTerm += `${!isSingleSearch ? '+' : ''}inpublisher:${searchData.searchPublisher}`;
		}

		this.setState({
			searchTerm: searchTerm,
			booksCollection: {
				items: [],
				totalItems: 0,
				kind: ''
			}
		})

		this.search(searchTerm);

	}

	search(searchTerm: string) {
		const request = async () => {
			const res = await this.getBooks({
				params: {
					q: searchTerm,
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
					q: this.state.searchTerm,
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