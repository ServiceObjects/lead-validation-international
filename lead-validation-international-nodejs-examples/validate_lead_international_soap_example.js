import { ValidateLeadInternationalSoap } from "../lead-validation-international-nodejs/src/SOAP/validate_lead_international_soap.js";

export async function validateLeadInternationalSoapGo(licenseKey, isLive) {
    console.log("\n-----------------------------------------------------------------------");
    console.log("LeadValidationInternational - ValidateLeadInternationalInput - SOAP SDK");
    console.log( "-----------------------------------------------------------------------");

    // Input Parameters
    const fullName = "Tim Cook";
    const salutation = "";
    const firstName = "Tim";
    const lastName = "Cook";
    const businessName = "Apple";
    const businessDomain = "apple.com";
    const businessEIN = "";
    const addressLine1 = "1 Infinite Loop";
    const addressLine2 = "";
    const addressLine3 = "";
    const addressLine4 = "";
    const addressLine5 = "";
    const locality = "Cupertino";
    const adminArea = "CA";
    const postalCode = "95014-2083";
    const country = "USA";
    const phone1 = "1-408-996-1010";
    const phone2 = "";
    const email = "tim@apple.com";
    const ipAddress = "";
    const gender = "M";
    const dateOfBirth = "";
    const utcCaptureTime = "2025-08-01T12:00:00Z";
    const outputLanguage = "English";
    const testType = "business-noip";
    const timeoutSeconds = 15;
    const testType = "business-noip";
    const timeoutSeconds = 15;

    // Display Input
    console.log("\n* Input *\n");
    console.log(`Full Name        : ${fullName}`);
    console.log(`Salutation       : ${salutation}`);
    console.log(`First Name       : ${firstName}`);
    console.log(`Last Name        : ${lastName}`);
    console.log(`Business Name    : ${businessName}`);
    console.log(`Business Domain  : ${businessDomain}`);
    console.log(`Business EIN     : ${businessEIN}`);
    console.log(`Address Line 1   : ${addressLine1}`);
    console.log(`Address Line 2   : ${addressLine2}`);
    console.log(`Address Line 3   : ${addressLine3}`);
    console.log(`Address Line 4   : ${addressLine4}`);
    console.log(`Address Line 5   : ${addressLine5}`);
    console.log(`Locality         : ${locality}`);
    console.log(`Admin Area       : ${adminArea}`);
    console.log(`Postal Code      : ${postalCode}`);
    console.log(`Country          : ${country}`);
    console.log(`Phone 1          : ${phone1}`);
    console.log(`Phone 2          : ${phone2}`);
    console.log(`Email            : ${email}`);
    console.log(`IP Address       : ${ipAddress}`);
    console.log(`Gender           : ${gender}`);
    console.log(`Date of Birth    : ${dateOfBirth}`);
    console.log(`UTC Capture Time : ${utcCaptureTime}`);
    console.log(`Output Language  : ${outputLanguage}`);
    console.log(`Test Type        : ${testType}`);
    console.log(`Timeout Seconds  : ${timeoutSeconds}`);
    console.log(`Is Live Mode     : ${isLive}`);
    console.log(`License Key      : ${licenseKey}`);

    try {
        // Initialize the ValidateLeadInternationalSoap class
        const lvi = new ValidateLeadInternationalSoap(fullName,
                                                    salutation,
                                                    firstName,
                                                    lastName,
                                                    businessName,
                                                    businessDomain,
                                                    businessEIN,
                                                    addressLine1,
                                                    addressLine2,
                                                    addressLine3,
                                                    addressLine4,
                                                    addressLine5,
                                                    locality,
                                                    adminArea,
                                                    postalCode,
                                                    country,
                                                    phone1,
                                                    phone2,
                                                    email,
                                                    ipAddress,
                                                    gender,
                                                    dateOfBirth,
                                                    utcCaptureTime,
                                                    outputLanguage,
                                                    testType,
                                                    licenseKey,
                                                    isLive,
                                                    timeoutSeconds);

        // Execute validation
        const response = await lvi.validateLeadInternational();

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
            console.log(`Locality              : ${response.AddressLocality}`);
            console.log(`Admin Area            : ${response.AddressAdminArea}`);
            console.log(`Postal Code           : ${response.AddressPostalCode}`);
            console.log(`Country               : ${response.AddressCountry}`);
            console.log(`Resolution Level      : ${response.AddressResolutionLevel}`);
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

            console.log(`\n* Phone Contact *\n`);
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

            console.log(`\n* Information Components *\n`);
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
    } catch (e) {
        console.log(`\nException occurred: ${e.message}`);
    }
}
