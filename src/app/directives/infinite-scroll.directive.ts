import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[pgInfiniteScroll]'
})
export class InfiniteScrollDirective {

    @Output()
    pageEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('window:scroll', ['$event']) onScrollEvent(event) {
        if (this.isScrollCloseToEnd()) {
            this.pageEnd.emit(true);
        }
    }

    private isScrollCloseToEnd(): boolean {
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const scrollHeight = document.documentElement.scrollHeight;

        const current = scrollTop + clientHeight;

        return scrollHeight - current < 100;
    }
}
