import React, { Component } from "react";
import { createPopper } from '@popperjs/core';
import './Search.css';

class SearchComponent extends Component<{
	searchCallback: any
}, {
	searchTitle: string,
	searchAuthor: string,
	searchPublisher: string
}> {
	showPopover = false;
	tooltip: HTMLElement;

	render() {
		return <div className='search-container'>
			<button id="button" className='advanced-search-btn me-2'>
				<i className="bi bi-gear"></i>
			</button>

			<div id="advanced-search" className="tooltip" role="tooltip">

				<div>
					<label htmlFor='authorInput'>Author</label>
					<input name='authorInput' type='text' onChange={this.authorOnChange}></input>
				</div>
				<div>
					<label htmlFor='publisherInput'>Publisher</label>
					<input name='publisherInput' type='text' onChange={this.publisherOnChange}></input>
				</div>

				<div className="arrow" data-popper-arrow></div>
			</div>

			<input className='search-input me-2' type='text' onChange={this.titleOnChange}></input>
			<button onClick={this.search}>Search</button>
		</div>
	}

	constructor(props: any) {
		super(props);

		this.titleOnChange = this.titleOnChange.bind(this);
		this.authorOnChange = this.authorOnChange.bind(this);
		this.publisherOnChange = this.publisherOnChange.bind(this);
		this.search = this.search.bind(this);
	}

	componentDidMount() {

		const button: any = document.querySelector('#button');
		this.tooltip = document.querySelector('#advanced-search')!;
		const popperInstance = createPopper(button, this.tooltip, {
			placement: 'top',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
			],
		});

		button.addEventListener('click', (event: any) => {
			this.showPopover = !this.showPopover;

			if (this.showPopover) {
				this.tooltip.setAttribute('data-show', '');
			} else {
				this.tooltip.removeAttribute('data-show');
			}

			popperInstance.update();
		});

	}

	titleOnChange(event: any) {
		this.setState({
			searchTitle: event.target.value
		});
	}

	authorOnChange(event: any) {
		this.setState({
			searchAuthor: event.target.value
		});
	}

	publisherOnChange(event: any) {
		this.setState({
			searchPublisher: event.target.value
		});
	}

	search() {
		this.tooltip.removeAttribute('data-show');
		const searchData = this.state;
		this.props.searchCallback({
			...searchData
		});
	}
}

export default SearchComponent