public with sharing class CarExperienceController {
    @AuraEnabled (cacheable=true)
    public static List<Car_Experience__c> getCarExperience(String carId){
        return [SELECT Id,
                    Name,
                    Experience__c,
                    LastModifiedDate,
                    CreatedDate,
                    CreatedBy.Name,
                    CreatedBy.SmallPhotoUrl,
                    CreatedBy.CompanyName
               FROM Car_Experience__c
               WHERE Car__c  = :carId
               ORDER BY CreatedDate DESC];
    }
}
