// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: true,
  template: `
    <div class="icon-button">
        <span class="material-symbols-rounded">{{props.icon}}</span>
        <span>{{props.text}}</span>
    </div>
  `,
  styles: [
    `.icon-button {
      display: flex;
      flex-direcion: row;
      align-items: center;
      width: fit-content;
      gap: 0.5rem;
      cursor: pointer;
      position: relative;
      transition: var(--transition-speed);
      padding: 0 0 0.25rem 0
    }`,
    `.icon-button:before {
      position: absolute;
      background-color: var(--text);
      content: '';
      height: 0px;
      bottom: 0px;
      left: 50%;
      width: 0px;
      transition: var(--transition-speed)
    }`,
    `.icon-button:hover {
      color: var(--primary);
    }`,
    `.icon-button:hover:before {
      color: var(--primary);
      background-color: var(--primary);
      height: 0.05rem;
      width: 100%;
      left: 0px;
    }`
  ],
  inputs: ['props']
})
export class IconButtonComponent {
    @Input() props: IconButton = {
        icon: 'check_box_outline_blank',
        text: 'Insert Text'
    };
}

interface IconButton {
    icon: string;
    text: string;
    // href?: string;
    // target?: string;
}

