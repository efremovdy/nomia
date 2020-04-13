import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LcgBoxComponent } from '../lcg-box.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
		<div class="lcg-box-list">
			<lcg-box [canClickHeader]="true">
				<ng-container header>
					<h4 class="lcg-box__header-title">Box 1</h4>
				</ng-container>
				<ng-container content>
					Content 1
				</ng-container>
			</lcg-box>
			<lcg-box [isOpen]="false" [noArrow]="true">
				<ng-container header>
					<h4 class="lcg-box__header-title">Box 2</h4>
				</ng-container>
				<ng-container content>
					Content 2
				</ng-container>
			</lcg-box>
			<lcg-box [isOpen]="false" [canClickHeader]="true" (onOpen)="collapse($event)">
				<ng-container header>
					<h4 class="lcg-box__header-title">Box 3</h4>
				</ng-container>
				<ng-container content>
					Content 3
				</ng-container>
			</lcg-box>
		</div>
        `
})
class LcgBoxTestComponent {
	@Output() eventEmitter = new EventEmitter();

	collapse(value: boolean) {
		this.eventEmitter.emit(value);
	}
}

describe('LcgBoxComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule
			],
			declarations: [
				LcgBoxComponent,
				LcgBoxTestComponent
			],
		}).compileComponents();
	});

	it('should create instance', () => {
		const fixture = TestBed.createComponent(LcgBoxComponent);
		const component = fixture.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should opened by default', () => {
		const fixture = TestBed.createComponent(LcgBoxComponent);
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__header--open')).toBeDefined();
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__header-chevron--up')).toEqual(null);
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__content')).toBeDefined();
		fixture.detectChanges();
		const chevron = fixture.debugElement.query(By.css('.lcg-box__header-chevron'));
		expect(chevron.nativeElement.getAttribute('aria-expanded')).toEqual('true');
	});

	it('should toggle', () => {
		const fixture = TestBed.createComponent(LcgBoxComponent);
		const component = fixture.componentInstance;
		component.toggle();
		fixture.detectChanges();
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__header--open')).toEqual(null);
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__header-chevron--up')).toBeDefined();
		expect(fixture.debugElement.nativeElement.querySelector('.lcg-box__content')).toEqual(null);
		const chevron = fixture.debugElement.query(By.css('.lcg-box__header-chevron'));
		expect(chevron.nativeElement.getAttribute('aria-expanded')).toEqual('false');
	});

	it('should opened and canClickHeader - the first children', () => {
		const fixture = TestBed.createComponent(LcgBoxTestComponent);
		fixture.detectChanges();
		const firstLcgBox = fixture.debugElement.nativeElement.children[0].children[0];
		expect(firstLcgBox.querySelector('.lcg-box__header--open')).toBeDefined();
		expect(firstLcgBox.querySelector('.lcg-box__header--pointer')).toBeDefined();
		expect(firstLcgBox.querySelector('.lcg-box__header-chevron--up')).toEqual(null);
		expect(firstLcgBox.querySelector('.lcg-box__content').innerHTML).toContain('Content 1');
		expect(firstLcgBox.querySelector('.lcg-box__header-chevron').getAttribute('aria-expanded')).toEqual('true');
	});

	it('should closed and noArrow - the second children', () => {
		const fixture = TestBed.createComponent(LcgBoxTestComponent);
		fixture.detectChanges();
		const second = fixture.debugElement.nativeElement.children[0].children[1];
		expect(second.querySelector('.lcg-box__header--open')).toEqual(null);
		expect(second.querySelector('.lcg-box__content')).toEqual(null);
		expect(second.querySelector('.lcg-box__header-chevron')).toEqual(null);
	});

	it('should onOpen emit - the third children', (done) => {
		const fixture = TestBed.createComponent(LcgBoxTestComponent);
		const component = fixture.componentInstance;
		fixture.detectChanges();
		component.eventEmitter.subscribe((isOpen) => {
			expect(isOpen).toBeTruthy();
			done();
		});
		const headerOfThirdEl = fixture.debugElement.nativeElement.children[0].children[2].querySelector('.lcg-box__header');
		headerOfThirdEl.click();
	});
});
