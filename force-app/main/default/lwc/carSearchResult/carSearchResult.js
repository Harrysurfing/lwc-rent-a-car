import { api, LightningElement, wire } from "lwc";
import { showToastEvent } from "lightning/platformShowToastEvent";

import getCars from "@salesforce/apex/carSearchResultController.getCars";

export default class CarSearchResult extends LightningElement {
  cars;
  selectedCarId;
  @api carTypeId;

  @wire(getCars, { carTypeId: "$carTypeId" }) wiredcars({ data, error }) {
    if (data) {
      console.log("data got" + data);
      this.cars = data;
    } else if (error) {
      this.showToast("Error", error.body.message, "error");
    }
  }

  showToast = (title, message, variant) => {
    const evt = new showToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  };

  get carsFound() {
    return this.cars ? true : false;
  }

  carselectHandler = (e) => {
    const carId = e.detail;
    this.selectedCarId = carId;
  };
}
