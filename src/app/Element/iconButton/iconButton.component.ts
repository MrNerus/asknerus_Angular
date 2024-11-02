// Suggested code may be subject to a license. Learn more: ~LicenseLog:2700584207.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1760960967.
import { Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="icon-button" [attr.data-mode]="props.mode || 'enabled'"[attr.data-type]="props.type || 'plain'">
        <span class="material-symbols-rounded">{{props.icon}}</span>
        <span class="text">{{props.text}}</span>
    </div>
  `,
  styleUrl: './iconButton.component.css',
  inputs: ['props']
})
export class IconButtonComponent {
  @Input() props: IconButton = {
    icon: 'check_box_outline_blank',
    text: 'Insert Text',
    type: 'plain',
    color: 'primary',
    mode: 'enabled'
  };

  @Input() clickHandler: Function;

  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
  }


}

interface IconButton {
  icon: string;
  text: string;
  type?: 'plain' | 'capsule';
  color?: string;
  mode?: 'disabled' | 'enabled';
  // href?: string;
  // target?: string;
}

