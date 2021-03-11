import { LightningElement, wire } from "lwc";
import getCarTypes from "@salesforce/apex/carSearchFormController.getCarTypes";
import { showToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class CarSearchForm extends NavigationMixin(LightningElement) {
  carTypes;
  selectedValue;

  @wire(getCarTypes) wiredCarTypes({ data, error }) {
    if (data) {
      this.carTypes = [{ value: "", label: "All Types" }];
      data.forEach((el) => {
        const carType = {};
        carType.label = el.Name;
        carType.value = el.Id;
        this.carTypes.push(carType);
      });
    } else if (error) {
      this.showToast("Error", error.body.message, "error");
    }
  }

  handleCarTypeChange = (e) => {
    const carTypeId = e.detail.value;
    this.selectedValue = e.target.value;
    const carTypeSelectionChangeEvent = new CustomEvent("cartypeselect", {
      detail: carTypeId
    });
    this.dispatchEvent(carTypeSelectionChangeEvent);
  };

  createNewCarType() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Car_Type__c",
        actionName: "new"
      }
    });
  }

  showToast = (title, message, variant) => {
    const event = new showToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  };
}
