import { ValidateLeadInternationalClient } from "../lead-validation-international-nodejs/src/REST/validate_lead_international_rest.js";

export async function validateLeadInternationalGo(licenseKey, isLive) {
    console.log("\n-----------------------------------------------------------------------");
    console.log("LeadValidationInternational - ValidateLeadInternationalInput - REST SDK");
    console.log( "-----------------------------------------------------------------------");

    const full_name = "Tim Cook";
    const salutation = "";
    const first_name = "Tim";
    const last_name = "Cook";
    const business_name = "Apple";
    const business_domain = "apple.com";
    const business_EIN = "";
    const address_line1 = "1 Infinite Loop";
    const address_line2 = "";
    const address_line3 = "";
    const address_line4 = "";
    const address_line5 = "";
    const locality = "Cupertino";
    const admin_area = "CA";
    const postal_code = "95014-2083";
    const country = "USA";
    const phone1 = "1-408-996-1010";
    const phone2 = "";
    const email = "tim@apple.com";
    const ip_address = "";
    const gender = "M";
    const date_of_birth = "";
    const utc_capture_time = "2025-08-01T12:00:00Z";
    const output_language = "English";
    const test_type = "business-noip";
    const timeout_seconds = 15;

    console.log("\n* Input *\n");
    console.log(`Full Name        : ${full_name}`);
    console.log(`Salutation       : ${salutation}`);
    console.log(`First Name       : ${first_name}`);
    console.log(`Last Name        : ${last_name}`);
    console.log(`Business Name    : ${business_name}`);
    console.log(`Business Domain  : ${business_domain}`);
    console.log(`Business EIN     : ${business_EIN}`);
    console.log(`Address Line 1   : ${address_line1}`);
    console.log(`Address Line 2   : ${address_line2}`);
    console.log(`Address Line 3   : ${address_line3}`);
    console.log(`Address Line 4   : ${address_line4}`);
    console.log(`Address Line 5   : ${address_line5}`);
    console.log(`Locality         : ${locality}`);
    console.log(`Admin Area       : ${admin_area}`);
    console.log(`Postal Code      : ${postal_code}`);
    console.log(`Country          : ${country}`);
    console.log(`Phone 1          : ${phone1}`);
    console.log(`Phone 2          : ${phone2}`);
    console.log(`Email            : ${email}`);
    console.log(`IP Address       : ${ip_address}`);
    console.log(`Gender           : ${gender}`);
    console.log(`Date of Birth    : ${date_of_birth}`);
    console.log(`UTC Capture Time : ${utc_capture_time}`);
    console.log(`Output Language  : ${output_language}`);
    console.log(`Test Type        : ${test_type}`);
    console.log(`Timeout Seconds  : ${timeout_seconds}`);
    console.log(`Is Live Mode     : ${isLive}`);
    console.log(`License Key      : ${licenseKey}`);

    try {
        const response = await ValidateLeadInternationalClient.invoke(full_name,
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
    } catch (e) {
        console.log(`\nException occurred: ${e.message}`);
    }
}
