![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# LVI - Lead Validation International  

DOTS Lead Validation International (LVI) evaluates international lead data and scores the data quality into pass/fail/review categories. By evaluating the information quality of a contact, online marketers can more effectively weed-out fraudulent contacts.Online fraudsters are more likely to provide inaccurate contact information because the address and phone number can be easily traced. 

Unlike other validation services that perform simple data checks on single variables, Service Objects Lead Validation solution is able to cross-validate that a contact’s name, address, phone numbers, e-mail and IP address are all matched each other and are related to the consumer.

## [Service Objects Website](https://serviceobjects.com)

# LVI - ValidateLeadInternational

Lead Validation International provides all of the functionality of the Lead Validation service but is able to process and handle international leads. It takes all of the standard information that a typical web form would provide: name, address, phone, email, and IP address. 

In addition to the full functionality of the original service.

### [ValidateLeadInternational Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-lead-validation-international/lvi-operations/lvi-validateleadinternational-recommended/)

## Library Usage

```
//
// 1. Build the input
//
//  Required fields:
//               country
//               test_type 
//               license_key
//               is_live
// 
// Optional:
//        full_name 
//        salutation
//        first_name
//        last_name
//        business_name
//        business_domain
//        business_EIN
//        address_line1
//        address_line2
//        address_line3
//        address_line4
//        address_line5
//        locality
//        admin_area
//        postal_code,
//        phone1
//        phone2
//        email
//        ip_address
//        gender
//        date_of_birth
//        utc_capture_time
//        output_language
//        timeout_seconds (default: 15)

import { ValidateLeadInternationalClient } from "../lead-validation-international-nodejs/src/REST/validate_lead_international_rest.js";

// 2. Call the method.

const response = await ValidateLeadInternationalClient.invoke(
    full_name,
    salutation,
    first_name,
    last_name,
    business_name,
    business_domain,
    business_EIN,
    address_line1,
    address_line2,
    address_line3,
    address_line4,
    address_line5,
    locality,
    admin_area,
    postal_code,
    country,
    phone1,
    phone2,
    email,
    ip_address,
    gender,
    date_of_birth,
    utc_capture_time,
    output_language,
    test_type,
    licenseKey,
    isLive,
    timeout_seconds
);

// 3. Inspect results.

if (response.Error)
    return console.error("Error invoking ValidateLeadInternational:", response.Error);

if (!response.Error) {
    console.log("\n* Lead Details *\n");
    console.log(`Overall Certainty     : ${response.OverallCertainty}`);
    console.log(`Overall Quality       : ${response.OverallQuality}`);
    console.log(`Lead Type             : ${response.LeadType}`);
    console.log(`Lead Country          : ${response.LeadCountry}`);
    console.log(`Note Codes            : ${response.NoteCodes}`);
    console.log(`Note Descriptions     : ${response.NoteDesc}`);

    console.log(`\n* Name Details *\n`);
    console.log(`Name Certainty        : ${response.NameCertainty}`);
    console.log(`Name Quality          : ${response.NameQuality}`);
    console.log(`First Name            : ${response.FirstName}`);
    console.log(`Last Name             : ${response.LastName}`);
    console.log(`First Name Latin      : ${response.FirstNameLatin}`);
    console.log(`Last Name Latin       : ${response.LastNameLatin}`);
    console.log(`Name Note Codes       : ${response.NameNoteCodes}`);
    console.log(`Name Note Descriptions: ${response.NameNoteDesc}`);

    console.log(`\n* Address Details *\n`);
    console.log(`Address Certainty     : ${response.AddressCertainty}`);
    console.log(`Address Quality       : ${response.AddressQuality}`);
    console.log(`Address Line 1        : ${response.AddressLine1}`);
    console.log(`Address Line 2        : ${response.AddressLine2}`);
    console.log(`Address Line 3        : ${response.AddressLine3}`);
    console.log(`Address Line 4        : ${response.AddressLine4}`);
    console.log(`Address Line 5        : ${response.AddressLine5}`);
    console.log(`Address Locality      : ${response.AddressLocality}`);
    console.log(`Address Admin Area    : ${response.AddressAdminArea}`);
    console.log(`Address Postal Code   : ${response.AddressPostalCode}`);
    console.log(`Address Country       : ${response.AddressCountry}`);
    console.log(`Address Resolution    : ${response.AddressResolutionLevel}`);
    console.log(`Address Note Codes    : ${response.AddressNoteCodes}`);
    console.log(`Address Note Desc     : ${response.AddressNoteDesc}`);

    console.log(`\n* Email Details *\n`);
    console.log(`Email Certainty       : ${response.EmailCertainty}`);
    console.log(`Email Quality         : ${response.EmailQuality}`);
    console.log(`Email Corrected       : ${response.EmailCorrected}`);
    console.log(`Email Note Codes      : ${response.EmailNoteCodes}`);
    console.log(`Email Note Desc       : ${response.EmailNoteDesc}`);

    console.log(`\n* IP Address Details *\n`);
    console.log(`IP Certainty          : ${response.IPCertainty}`);
    console.log(`IP Quality            : ${response.IPQuality}`);
    console.log(`IP Country            : ${response.IPCountry}`);
    console.log(`IP Locality           : ${response.IPLocality}`);
    console.log(`IP Admin Area         : ${response.IPAdminArea}`);
    console.log(`IP Note Codes         : ${response.IPNoteCodes}`);
    console.log(`IP Note Descriptions  : ${response.IPNoteDesc}`);

    console.log(`\n* Phone Details *\n`);
    console.log(`Phone 1 Certainty     : ${response.Phone1Certainty}`);
    console.log(`Phone 1 Quality       : ${response.Phone1Quality}`);
    console.log(`Phone 1 Locality      : ${response.Phone1Locality}`);
    console.log(`Phone 1 Admin Area    : ${response.Phone1AdminArea}`);
    console.log(`Phone 1 Country       : ${response.Phone1Country}`);
    console.log(`Phone 1 Note Codes    : ${response.Phone1NoteCodes}`);
    console.log(`Phone 1 Note Desc     : ${response.Phone1NoteDesc}`);

    console.log(`Phone 2 Certainty     : ${response.Phone2Certainty}`);
    console.log(`Phone 2 Quality       : ${response.Phone2Quality}`);
    console.log(`Phone 2 Locality      : ${response.Phone2Locality}`);
    console.log(`Phone 2 Admin Area    : ${response.Phone2AdminArea}`);
    console.log(`Phone 2 Country       : ${response.Phone2Country}`);
    console.log(`Phone 2 Note Codes    : ${response.Phone2NoteCodes}`);
    console.log(`Phone 2 Note Desc     : ${response.Phone2NoteDesc}`);

    console.log(`\n* Business Details *\n`);
    console.log(`Business Certainty    : ${response.BusinessCertainty}`);
    console.log(`Business Quality      : ${response.BusinessQuality}`);
    console.log(`Business Name         : ${response.BusinessName}`);
    console.log(`Business Domain       : ${response.BusinessDomain}`);
    console.log(`Business Email        : ${response.BusinessEmail}`);
    console.log(`Business Note Codes   : ${response.BusinessNoteCodes}`);
    console.log(`Business Note Desc    : ${response.BusinessNoteDesc}`);

    console.log("\n* Phone Contact *\n");
    if (response.PhoneContact) {
        console.log(`Name   : ${response.PhoneContact.Name}`);
        console.log(`Address: ${response.PhoneContact.Address}`);
        console.log(`City   : ${response.PhoneContact.City}`);
        console.log(`State  : ${response.PhoneContact.State}`);
        console.log(`Zip    : ${response.PhoneContact.Zip}`);
        console.log(`Type   : ${response.PhoneContact.Type}`);
    } else {
        console.log("No phone contact found.");
    }

    console.log("\n* Information Components *\n");
    if (response.InformationComponents && response.InformationComponents>0) {
        response.InformationComponents.forEach((component) => {
            console.log(`Name : ${component.Name}`);
            console.log(`Value: ${component.Value}\n`);
        });
    } else {
        console.log("No information components found.");
    }
} else {
    console.log("\n* Error *\n");
    console.log(`Error Type       : ${response.Error.Type}`);
    console.log(`Error Type Code  : ${response.Error.TypeCode}`);
    console.log(`Error Description: ${response.Error.Desc}`);
    console.log(`Error Desc Code  : ${response.Error.DescCode}`);
}
```

