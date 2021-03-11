import { LightningElement } from "lwc";

export default class CarSearch extends LightningElement {
  carTypeId = "";
  carTypeSelectHandler = (e) => {
    this.carTypeId = e.detail;
  };
}
