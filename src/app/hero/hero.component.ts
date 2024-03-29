import { Component, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import {fromEvent, Observable, Subscription} from 'rxjs'

// utils
import messages from '../../utils/messages'
import constants from '../../utils/constants'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private animation_subscription?: Subscription

  scroll_animation_delay = 5
  messages = messages.en
  constants = constants

  @ViewChild('container') container: ElementRef | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit(): void {
    this.animation_subscription = fromEvent(this.document, 'scroll').subscribe(this.scroll_animation)
  }

  ngOnDestroy() {
    this.animation_subscription?.unsubscribe()
  }

  scroll_animation = () => {
    const container = this.container?.nativeElement
    if (container && window && window.scrollY < 1500 && window.innerWidth >= 1200) {
      const scroll = window.scrollY / this.scroll_animation_delay
      container.style.setProperty('--scroll', `${scroll}px`)
    }
  }
}
