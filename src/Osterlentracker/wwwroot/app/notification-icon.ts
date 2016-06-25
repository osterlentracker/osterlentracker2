import {observable, computed, bindable, bindingMode, inject, BindingEngine, ObserverLocator} from 'aurelia-framework';

@inject(ObserverLocator)
export class NotificationIconCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public items = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public open = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public showCount = false;

  @computed
  get count() {
      return this.items.filter(x => !x.read).length;
  }

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;

     this.observer = this.bindingEngine.getArrayObserver.bind(bindingEngine)(this.items);
    this.observer.subscribe((splice) => this.itemsChanged(splice));
  }

   public itemsChanged(splices: { addedCount: number, index: number, removed: [] }): void {
        console.log(splices);
        this.showCount = true;
    }

   public openChanged(newValue: string, oldValue: string): void {
       if(this.open) {
            $('#notifications').fadeIn('fast', 'linear');
            this.showCount = false;
       } else {
             $('#notifications').fadeOut('fast', 'linear');
       }
    }

    public showCountChanged(newValue: string, oldValue: string): void {
        if(this.showCount) {
            $('#noti_Counter')
            .show()
            .css({ opacity: 0 })
            .css({ top: '-10px' })
            .animate({ top: '-2px', opacity: 1 }, 500);
        } else {
            $('#noti_Counter').fadeOut('slow'); 
        }
    }

  attached() {
    let _this = this;
    $(document).ready(() => {
        $('#noti_Button').click(() => {

            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
            if(_this.open) {
                _this.open = false;
            } else {
                for(let x of this.items) {
                    x.read = true;
                }
                _this.open = true;
            }

            return false;
        });

        // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
        $(document).click(() => {
            _this.open = false;
        });

        $('#notifications').click(() => {
            return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
        });
    });
  }

  detached() {

  }
}