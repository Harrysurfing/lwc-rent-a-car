import { LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import { CurrentPageReference } from "lightning/navigation";

import { registerListener, unregisterAllListeners } from "c/pubsub";

//import fields
import CAR_ID from "@salesforce/schema/Car__c.Id";
import CAR_NAME from "@salesforce/schema/Car__c.Name";
import CAR_MILEAGE from "@salesforce/schema/Car__c.Mileage__c";
import CAR_PER_DAY_RENT from "@salesforce/schema/Car__c.Per_Day_Rent__c";
import CAR_BUILD_YEAR from "@salesforce/schema/Car__c.Build_Year__c";
import CAR_PICTURE from "@salesforce/schema/Car__c.Picture__c";
import CAR_CONTACT_NAME from "@salesforce/schema/Car__c.Contact__r.Name";
import CAR_CONTACT_EMAIL from "@salesforce/schema/Car__c.Contact__r.Email";
import CAR_CONTACT_PHONE from "@salesforce/schema/Car__c.Contact__r.HomePhone";
import CAR_CARTYPE_NAME from "@salesforce/schema/Car__c.Car_Type__r.Name";

const fields = [
  CAR_ID,
  CAR_NAME,
  CAR_PER_DAY_RENT,
  CAR_BUILD_YEAR,
  CAR_PICTURE,
  CAR_CONTACT_NAME,
  CAR_CONTACT_EMAIL,
  CAR_CONTACT_PHONE,
  CAR_MILEAGE,
  CAR_CARTYPE_NAME
];

export default class CarDetails extends LightningElement {
  carId;
  selectedTabValue;

  @wire(getRecord, { recordId: "$carId", fields }) wiredCar;

  @wire(CurrentPageReference) pageRef;

  tabChangeHandler = (e) => {
    this.selectedTabValue = e.target.value;
  };

  get carFound() {
    return this.wiredCar.data ? true : false;
  }

  connectedCallback() {
    registerListener(
      "carselect",
      (payload) => {
        this.carId = payload;
      },
      this
    );
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}
