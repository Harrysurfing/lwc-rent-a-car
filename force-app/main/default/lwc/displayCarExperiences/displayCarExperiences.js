import { api, LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

import getCarExperience from "@salesforce/apex/CarExperienceController.getCarExperience";

export default class DisplayCarExperiences extends NavigationMixin(
  LightningElement
) {
  carExperiences;
  privateCarId;
  @api get carId() {
    return this.privateCarId;
  }
  set carId(value) {
    this.privateCarId = value;
    this.getExperience();
  }

  getExperience() {
    getCarExperience({ carId: this.carId })
      .then((result) => {
        this.carExperiences = result;
        console.log(this.carExperiences);
        console.log(this.carId);
      })
      .catch((e) => this.showToast("Error", e.body.message, "error"));
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }

  userClickHandler(e) {
    const userId = e.target.getAttribute("data-userid");
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: userId,
        objectApiName: "User",
        actionName: "view"
      }
    });
  }

  get hasExperiences() {
    return typeof this.carExperiences !== "undefined" &&
      this.carExperiences.length > 0
      ? true
      : false;
  }

  connectedCallback() {
    this.getExperience();
  }
}
