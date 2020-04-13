import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * Компонент box
 *
 * The <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html">Accordion Example</a>.
 */
@Component({
	selector: 'lcg-box',
	templateUrl: './lcg-box.component.html',
	styleUrls: ['./lcg-box.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: { 'class': 'lcg-box-component' }
})
export class LcgBoxComponent {
	/**
	 * Атрибут isOpen - открыт ли бокс
	 */
	@Input()
	isOpen = true;

	/**
	 * Атрибут noArrow - если не нужен chevron справа (например - бокс поиска)
	 */
	@Input()
	noArrow = false;

	/**
	 * Атрибут canClickHeader - если нужен click по всему хедеру
	 */
	@Input()
	canClickHeader = false;

	/**
	 * Поток открытия бокса. Состояние бокса после клика
	 */
	@Output()
	readonly onOpen: EventEmitter<boolean> = new EventEmitter<boolean>(true);

	/**
	 * Метод переключения состояния
	 */
	public toggle() {
		this.isOpen = !this.isOpen;
		this.onOpen.emit(this.isOpen);
	}

	/**
	 * Метод для клика по хедеру - проверка на атрибут canClickHeader
	 */
	public clickOnHeader() {
		if (this.canClickHeader) {
			this.toggle();
		}
	}

	/**
	 * Обработчик клавиатуры
	 */
	public keyboardHandler(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
			case ' ': // space
				event.preventDefault();
				this.toggle();
				break;
			case 'ArrowUp':
			case 'ArrowDown':
				event.preventDefault();
				this.upOrDownPressed(event.key);
				break;
			case 'Home':
			case 'End':
				event.preventDefault();
				this.homeOrEndPressed(event.key);
				break;
		}
	}

	/**
	 * Обработчик Home и End клавиш: находит в DOM первый или последний элемент и фокусит его
	 */
	private homeOrEndPressed(code: string) {
		const lcgBoxListEl = (document.activeElement.parentNode.parentNode.parentNode as HTMLElement)
			.closest(".lcg-box-list"); // get parent list element
		if (!lcgBoxListEl) {
			return;
		}
		const selector = code === 'Home' ? 'firstChild' : 'lastChild';
		const targetEl = lcgBoxListEl[selector].firstChild.firstChild as HTMLElement;
		targetEl.focus();
	}

	/**
	 * Обработчик ArrowUp и ArrowDown клавиш: находит в DOM предыдущий или следующий элемент и фокусит его
	 */
	private upOrDownPressed(code: string) {
		const lcgBoxEl = document.activeElement.parentNode.parentNode; // get main box element
		const siblingType = code === 'ArrowUp' ? 'previousSibling' : 'nextSibling';
		const targetEl: Node | ChildNode = lcgBoxEl[siblingType];
		if (targetEl && targetEl.nodeName) {
			const targetTabIndexEl = targetEl.firstChild.firstChild as HTMLElement; // get header element
			targetTabIndexEl.focus();
		}
	}
}
