import React, { Component } from "react";
import { createPopper } from '@popperjs/core';
import './Search.css';

class SearchComponent extends Component<{}, {}> {
	showPopover = false;

	componentDidMount() {
		const button: any = document.querySelector('#button');
		const tooltip: any = document.querySelector('#tooltip');
		const popperInstance = createPopper(button, tooltip, {
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
				tooltip.setAttribute('data-show', '');
			} else {
				tooltip.removeAttribute('data-show');
			}

			popperInstance.update();
		});

	}

	render() {
		return <div>
			<button id="button">Advanced Search</button>

			<div id="tooltip" role="tooltip">
				
				<div>
					<label>Author</label>
					<input type='text'></input>
				</div>
				<div>
					<label>Publisher</label>
					<input type='text'></input>
				</div>

				<div id="arrow" data-popper-arrow></div>
			</div>

			<input type='text'></input>
			<button>Search</button>
		</div>
	}
}

export default SearchComponent