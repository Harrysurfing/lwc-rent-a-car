import { LightningElement, api, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";

import { fireEvent } from "c/pubsub";

export default class CarTile extends LightningElement {
  @api car;
  @api selectedCarId;

  @wire(CurrentPageReference) pageRef;

  handleCarSelect(e) {
    e.preventDefault();

    const carId = this.car.Id;

    const carSelect = new CustomEvent("carselect", { detail: carId });
    this.dispatchEvent(carSelect);

    fireEvent(this.pageRef, "carselect", this.car.Id);
  }

  get isCarSelected() {
    return this.car.Id === this.selectedCarId ? "tile selected" : "tile";
  }
}
