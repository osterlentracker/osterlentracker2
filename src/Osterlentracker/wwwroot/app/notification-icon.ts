import {observable, bindable, bindingMode, inject, BindingEngine, ObserverLocator} from 'aurelia-framework';

@inject(ObserverLocator)
export class NotificationIconCustomElement {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public items = [{ title: "test 1" }];

  @bindable({ defaultBindingMode: bindingMode.oneWay })
  public open = true;

  @bindable({ defaultBindingMode: bindingMode.oneWay })
  public showCount = false;

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;

    let observer = this.bindingEngine.getArrayObserver(this.items);
      observer.subscribe((splice) => this.itemsChanged(splice));
  }

    public itemsChanged(splices: { addedCount: number, index: number, removed: [] }): void {
        console.log(splices);
        //this.showCount = true;
    }

   public openChanged(newValue: string, oldValue: string): void {
        console.log(newValue);
    }

    public showCountChanged(newValue: string, oldValue: string): void {
        if(this.showCount) {
            $('#noti_Counter')
            .css({ opacity: 0 })
            .css({ top: '-10px' })
            .animate({ top: '-2px', opacity: 1 }, 500);
        } else {
            $('#noti_Counter').fadeOut('slow'); 
        }
    }

  attached() {
    $(document).ready(() => {
        $('#noti_Button').click(() => {

            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
            $('#notifications').fadeToggle('fast', 'linear', () => {
                if ($('#notifications').is(':hidden')) {
                    //$('#noti_Button').css('background-color', '#2E467C');
                }
                //else $('#noti_Button').css('background-color', '#FFF');        // CHANGE BACKGROUND COLOR OF THE BUTTON.
            });

            $('#noti_Counter').fadeOut('slow');                 // HIDE THE COUNTER.

            return false;
        });

        // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
        $(document).click(() => {
            $('#notifications').hide();

            // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
            if ($('#noti_Counter').is(':hidden')) {
                // CHANGE BACKGROUND COLOR OF THE BUTTON.
                //$('#noti_Button').css('background-color', '#2E467C');
            }
        });

        $('#notifications').click(() => {
            return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
        });
    });
  }

  detached() {

  }
}