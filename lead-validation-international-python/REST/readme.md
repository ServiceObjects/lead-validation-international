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
#
# 1. Build the input
#
#  Required fields:
#               country
#               test_type 
#               license_key
#               is_live
# 
# Optional:
#        full_name 
#        salutation
#        first_name
#        last_name
#        business_name
#        business_domain
#        business_EIN
#        address_line1
#        address_line2
#        address_line3
#        address_line4
#        address_line5
#        locality
#        admin_area
#        postal_code,
#        phone1
#        phone2
#        email
#        ip_address
#        gender
#        date_of_birth
#        utc_capture_time
#        output_language
#        timeout_seconds (default: 15)

from validate_lead_international_rest import validate_lead_international

# 2. Call the method.
  
  response = validate_lead_international(
            full_name, salutation, first_name, last_name,
            business_name, business_domain, business_EIN,
            address_line1, address_line2, address_line3,
            address_line4, address_line5,
            locality, admin_area, postal_code, country,
            phone1, phone2, email, ip_address,
            gender, date_of_birth, utc_capture_time,
            output_language, test_type, license_key,
            is_live, timeout_seconds
            )

# 3. Inspect results.

 if response.Error is None:
            print("\n* Lead Details *\n")
            print(f"Overall Certainty     : {response.OverallCertainty}")
            print(f"Overall Quality       : {response.OverallQuality}")
            print(f"Lead Type             : {response.LeadType}")
            print(f"Lead Country          : {response.LeadCountry}")
            print(f"Note Codes            : {response.NoteCodes}")
            print(f"Note Descriptions     : {response.NoteDesc}")

            print("\n*  Name Details *\n")
            print(f"Name Certainty        : {response.NameCertainty}")
            print(f"Name Quality          : {response.NameQuality}")
            print(f"First Name            : {response.FirstName}")
            print(f"Last Name             : {response.LastName}")
            print(f"First Name Latin      : {response.FirstNameLatin}")
            print(f"Last Name Latin       : {response.LastNameLatin}")
            print(f"Name Note Codes       : {response.NameNoteCodes}")
            print(f"Name Note Descriptions: {response.NameNoteDesc}")

            print("\n*  Address Details *\n")
            print(f"Address Certainty     : {response.AddressCertainty}")
            print(f"Address Quality       : {response.AddressQuality}")
            print(f"Address Line 1        : {response.AddressLine1}")
            print(f"Address Line 2        : {response.AddressLine2}")
            print(f"Address Line 3        : {response.AddressLine3}")
            print(f"Address Line 4        : {response.AddressLine4}")
            print(f"Address Line 5        : {response.AddressLine5}")
            print(f"Address Locality      : {response.AddressLocality}")
            print(f"Address Admin Area    : {response.AddressAdminArea}")
            print(f"Address Postal Code   : {response.AddressPostalCode}")
            print(f"Address Country       : {response.AddressCountry}")
            print(f"Address Resolution    : {response.AddressResolutionLevel}")
            print(f"Address Note Codes    : {response.AddressNoteCodes}")
            print(f"Address Note Desc     : {response.AddressNoteDesc}")

            print("\n*  Email Details *\n")
            print(f"Email Certainty       : {response.EmailCertainty}")
            print(f"Email Quality         : {response.EmailQuality}")
            print(f"Email Corrected       : {response.EmailCorrected}")
            print(f"Email Note Codes      : {response.EmailNoteCodes}")
            print(f"Email Note Desc       : {response.EmailNoteDesc}")

            print("\n*  IP Address Details *\n")
            print(f"IP Certainty          : {response.IPCertainty}")
            print(f"IP Quality            : {response.IPQuality}")
            print(f"IP Country            : {response.IPCountry}")
            print(f"IP Locality           : {response.IPLocality}")
            print(f"IP Admin Area         : {response.IPAdminArea}")
            print(f"IP Note Codes         : {response.IPNoteCodes}")
            print(f"IP Note Descriptions  : {response.IPNoteDesc}")

            print("\n*  Phone Details *\n")
            print(f"Phone 1 Certainty     : {response.Phone1Certainty}")
            print(f"Phone 1 Quality       : {response.Phone1Quality}")
            print(f"Phone 1 Locality      : {response.Phone1Locality}")
            print(f"Phone 1 Admin Area    : {response.Phone1AdminArea}")
            print(f"Phone 1 Country       : {response.Phone1Country}")
            print(f"Phone 1 Note Codes    : {response.Phone1NoteCodes}")
            print(f"Phone 1 Note Desc     : {response.Phone1NoteDesc}")
            print(f"Phone 2 Certainty     : {response.Phone2Certainty}")

            print(f"Phone 2 Quality       : {response.Phone2Quality}")
            print(f"Phone 2 Locality      : {response.Phone2Locality}")
            print(f"Phone 2 Admin Area    : {response.Phone2AdminArea}")
            print(f"Phone 2 Country       : {response.Phone2Country}")
            print(f"Phone 2 Note Codes    : {response.Phone2NoteCodes}")
            print(f"Phone 2 Note Desc     : {response.Phone2NoteDesc}")

            print("\n* Business Details *\n")
            print(f"Business Certainty    : {response.BusinessCertainty}")
            print(f"Business Quality      : {response.BusinessQuality}")
            print(f"Business Name         : {response.BusinessName}")
            print(f"Business Domain       : {response.BusinessDomain}")
            print(f"Business Email        : {response.BusinessEmail}")
            print(f"Business Note Codes   : {response.BusinessNoteCodes}")
            print(f"Business Note Desc    : {response.BusinessNoteDesc}")

            print("\n* Phone Contact *\n")
            if hasattr(response, 'PhoneContact') and response.PhoneContact:
                print(f"Name   : {response.PhoneContact.Name}")
                print(f"Address: {response.PhoneContact.Address}")
                print(f"City   : {response.PhoneContact.City}")
                print(f"State  : {response.PhoneContact.State}")
                print(f"Zip    : {response.PhoneContact.Zip}")
                print(f"Type   : {response.PhoneContact.Type}")
            else:
                print("No phone contact returned.")

            print("\n* Information Components *\n")
            if hasattr(response, 'InformationComponents') and response.InformationComponents:
                for component in response.InformationComponents:
                    print(f"Name : {component.Name}")
                    print(f"Value: {component.Value}")
                    print("")
            else:
                print("No information components returned.")
        else:
          if hasattr(response, 'Error') and response.Error:
            print("\n* Error *\n")
            print(f"Error Type       : {response.Error.Type}")
            print(f"Error Type Code  : {response.Error.TypeCode}")
            print(f"Error Description: {response.Error.Desc}")
            print(f"Error Desc Code  : {response.Error.DescCode}")

    except Exception as e:
        print(f"\nException occurred: {str(e)}")
```

