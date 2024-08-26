// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="icon-button" [attr.data-type]="props.type || 'plain'">
        <span class="material-symbols-rounded">{{props.icon}}</span>
        <span class="text">{{props.text}}</span>
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
    `.icon-button[data-type = "capsule"] {
      border-radius: 0.5rem;
      background-color: var(--{{props.color || 'primary'}});
      color: var(--{{props.color || 'dark'}});
      padding: 0.5rem;
    }`,
    `.icon-button[data-type="plain"]:before {
      position: absolute;
      background-color: var(--text);
      content: '';
      height: 0px;
      bottom: 0px;
      left: 50%;
      width: 0px;
      transition: var(--transition-speed)
    }`,
    `.icon-button[data-type="plain"]:hover {
      color: var(--primary);
    }`,
    `.icon-button[data-type="plain"]:hover:before {
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
    text: 'Insert Text',
    type: 'plain',
    color: 'primary'
  };

  ngOnInit(): void {
    console.log(this.props);
  }
}

interface IconButton {
  icon: string;
  text: string;
  type?: 'plain' | 'capsule';
  color?: string;
  // href?: string;
  // target?: string;
}

