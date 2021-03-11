import { api, LightningElement } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from "@salesforce/schema/Car_Experience__c.Name";
import EXPERIENCE_FIELD from "@salesforce/schema/Car_Experience__c.Experience__c";
import CAR_FIELD from "@salesforce/schema/Car_Experience__c.Car__c";
import EXPERIENCE_OBJECT from "@salesforce/schema/Car_Experience__c";

export default class AddCarExperience extends LightningElement {
  @api carId;

  expTitle = "";
  expDescription = "";
  handleTitleChange(e) {
    this.expTitle = e.target.value;
  }

  handleDescriptionChange(e) {
    this.expDescription = e.target.value;
  }
  addExperience() {
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.expTitle;
    fields[EXPERIENCE_FIELD.fieldApiName] = this.expDescription;
    fields[CAR_FIELD.fieldApiName] = this.carId;

    const recrodIput = { apiName: EXPERIENCE_OBJECT.objectApiName, fields };

    createRecord(recrodIput)
      .then((carExperience) => {
        this.showToast("Success", "Your experience is submitted", "success");
      })
      .catch((e) => {
        this.showToast("Error", e.body.message, "error");
      })
      .finally(() => {
        this.expTitle = "";
        this.expDescription = "";
      });
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }
}
