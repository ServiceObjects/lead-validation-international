import sys
import os

sys.path.insert(0, os.path.abspath("../lead-validation-international-python/REST"))

from validate_lead_international_rest import validate_lead_international

def validate_lead_international_rest_sdk_go(license_key: str, is_live: bool) -> None:
    print("\n-----------------------------------------------------------------------")
    print("LeadValidationInternational - ValidateLeadInternationalInput - REST SDK")
    print("-----------------------------------------------------------------------")

    full_name = "Tim Cook"
    salutation = ""
    first_name = "Tim"
    last_name = "Cook"
    business_name = "Apple"
    business_domain = "apple.com"
    business_EIN = ""
    address_line1 = "1 Infinite Loop"
    address_line2 = ""
    address_line3 = ""
    address_line4 = ""
    address_line5 = ""
    locality = "Cupertino"
    admin_area = "CA"
    postal_code = "95014-2083"
    country = "USA"
    phone1 = "1-408-996-1010"
    phone2 = ""
    email = "tim@apple.com"
    ip_address = ""
    gender = "M"
    date_of_birth = ""
    utc_capture_time = "2025-08-01T12:00:00Z"
    output_language = "English"
    test_type = "business-noip"
    timeout_seconds = 15

    print("\n* Input *\n")
    print(f"Full Name        : {full_name}")
    print(f"Salutation       : {salutation}")
    print(f"First Name       : {first_name}")
    print(f"Last Name        : {last_name}")
    print(f"Business Name    : {business_name}")
    print(f"Business Domain  : {business_domain}")
    print(f"Business EIN     : {business_EIN}")
    print(f"Address Line 1   : {address_line1}")
    print(f"Address Line 2   : {address_line2}")
    print(f"Address Line 3   : {address_line3}")
    print(f"Address Line 4   : {address_line4}")
    print(f"Address Line 5   : {address_line5}")
    print(f"Locality         : {locality}")
    print(f"Admin Area       : {admin_area}")
    print(f"Postal Code      : {postal_code}")
    print(f"Country          : {country}")
    print(f"Phone 1          : {phone1}")
    print(f"Phone 2          : {phone2}")
    print(f"Email            : {email}")
    print(f"IP Address       : {ip_address}")
    print(f"Gender           : {gender}")
    print(f"Date of Birth    : {date_of_birth}")
    print(f"UTC Capture Time : {utc_capture_time}")
    print(f"Output Language  : {output_language}")
    print(f"Test Type        : {test_type}")
    print(f"Timeout Seconds  : {timeout_seconds}")
    print(f"Is Live Mode     : {is_live}")

    try:
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

