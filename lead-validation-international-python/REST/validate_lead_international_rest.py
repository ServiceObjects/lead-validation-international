'''
Service Objects, Inc.

This module provides the validate_lead_international function to validate international lead data
using Service Objects LVI API. It handles live/trial endpoints, fallback logic, and JSON parsing.

Functions:
    validate_lead_international(full_name: str,
                        salutation: str,
                        first_name: str,
                        last_name: str,
                        business_name: str,
                        business_domain: str,
                        business_EIN: str,
                        address_line1: str,
                        address_line2: str,
                        address_line3: str,
                        address_line4: str,
                        address_line5: str,
                        locality: str,
                        admin_area: str,
                        postal_code: str,
                        country: str,
                        phone1: str,
                        phone2: str,
                        email: str,
                        ip_address: str,
                        gender: str,
                        date_of_birth: str,
                        utc_capture_time: str,
                        output_language: str,
                        test_type: str,
                        license_key: str,
                        is_live: bool = True,
                        timeout_seconds: int = 15
'''

import requests  # HTTP client for RESTful API calls
from lvi_response import LVIResponse, Error, InformationComponent, PhoneContact

# Endpoint URLs for LVI ValidateLeadInternational REST API
primary_url = 'https://sws.serviceobjects.com/lvi/api.svc/json/ValidateLeadInternational?'
backup_url = 'https://swsbackup.serviceobjects.com/lvi/api.svc/json/ValidateLeadInternational?'
trial_url = 'https://trial.serviceobjects.com/lvi/api.svc/json/ValidateLeadInternational?'

def validate_lead_international(
                        full_name: str,
                        salutation: str,
                        first_name: str,
                        last_name: str,
                        business_name: str,
                        business_domain: str,
                        business_EIN: str,
                        address_line1: str,
                        address_line2: str,
                        address_line3: str,
                        address_line4: str,
                        address_line5: str,
                        locality: str,
                        admin_area: str,
                        postal_code: str,
                        country: str,
                        phone1: str,
                        phone2: str,
                        email: str,
                        ip_address: str,
                        gender: str,
                        date_of_birth: str,
                        utc_capture_time: str,
                        output_language: str,
                        test_type: str,
                        license_key: str,
                        is_live: bool = True,
                        timeout_seconds: int = 15
                    ) -> LVIResponse:
    """
    Call LVI ValidateLeadInternational API to retrieve phone number information.

    Parameters:
        full_name: The contact's full name. e.g. Jane Doe
        salutation: Salutation of the contact. Dr, Esq, Mr, Mrs etc
        first_name: First name of the contact. e.g. Jane
        last_name: Last name of the contact. e.g. Doe
        business_name: The contact's company. e.g. Service Objects
        business_domain: Website domain associated with the business. e.g. serviceobjects.com
        business_EIN: Represents the Company Tax Number. Used for Tax exempt checks for US leads.
        address_line1: The address 1 of the contact or business address.
        address_line2: The address 2 of the contact or business address.
        address_line3: The address 3 of the contact or business address.
        address_line4: The address 4 of the contact or business address.
        address_line5: The address 5 of the contact or business address.
        locality: The city of the contact's postal address.
        admin_area: The state of the contact's postal address.
        postal_code: The zip code of the contact's postal address.
        country: The country of the contact's postal address. e.g. United States, US or USA
        phone1: The contact's primary phone number.
        phone2: The contact's secondary phone number.
        email: The contact's email address.
        ip_address: The contact's IP address in IPv4. (IPv6 coming in a future release)
        gender: Male, Female or Neutral
        date_of_birth: The contact's date of birth
        utc_capture_time: The time the lead was submitted
        output_language: Language field indicating what language some of the output information will be.
        test_type: The name of the type of validation you want to perform on this contact.
        license_key: Your license key to use the service.
        is_live: Value to determine whether to use the live or trial servers
        timeout_seconds: Timeout, in seconds, for the call to the service.

    Returns:
        dict: Parsed JSON response with phone information or error details.
    """

    params = {
        'FullName': full_name,
        'Salutation': salutation,
        'FirstName': first_name,
        'LastName': last_name,
        'BusinessName': business_name,
        'BusinessDomain': business_domain,
        'BusinessEIN': business_EIN,
        'AddressLine1': address_line1,
        'AddressLine2': address_line2,
        'AddressLine3': address_line3,
        'AddressLine4': address_line4,
        'AddressLine5': address_line5,
        'Locality': locality,
        'AdminArea': admin_area,
        'PostalCode': postal_code,
        'Country': country,
        'Phone1': phone1,
        'Phone2': phone2,
        'Email': email,
        'IPAddress': ip_address,
        'Gender': gender,
        'DateOfBirth': date_of_birth,
        'UTCCaptureTime': utc_capture_time,
        'OutputLanguage': output_language,
        'TestType': test_type,
        'LicenseKey': license_key,
        'IsLive': is_live,
        'TimeoutSeconds': timeout_seconds
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'Number', None) != "3"):
            if is_live:
                # Try backup URL
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                # If still error, propagate exception
                if 'Error' in data:
                    raise RuntimeError(f"LVI backup error: {data['Error']}")
            else:
                # Trial mode error is terminal
                raise RuntimeError(f"LVI trial error: {data['Error']}")

        # Convert JSON response to LVIResponse for structured access
        error = Error(**data.get('Error', {})) if data.get('Error') else None
        info_components = [InformationComponent(**ic) for ic in data.get('InformationComponents', [])] if data.get('InformationComponents') else None
        phone_contact = PhoneContact(**data.get('PhoneContact', {})) if data.get('PhoneContact') else None
        
        return LVIResponse(
                        OverallCertainty=data.get('OverallCertainty'),
                        OverallQuality=data.get('OverallQuality'),
                        LeadType=data.get('LeadType'),
                        LeadCountry=data.get('LeadCountry'),
                        NoteCodes=data.get('NoteCodes'),
                        NoteDesc=data.get('NoteDesc'),
                        NameCertainty=data.get('NameCertainty'),
                        NameQuality=data.get('NameQuality'),
                        FirstNameLatin=data.get('FirstNameLatin'),
                        LastNameLatin=data.get('LastNameLatin'),
                        FirstName=data.get('FirstName'),
                        LastName=data.get('LastName'),
                        NameNoteCodes=data.get('NameNoteCodes'),
                        NameNoteDesc=data.get('NameNoteDesc'),
                        AddressCertainty=data.get('AddressCertainty'),
                        AddressQuality=data.get('AddressQuality'),
                        AddressResolutionLevel=data.get('AddressResolutionLevel'),
                        AddressLine1=data.get('AddressLine1'),
                        AddressLine2=data.get('AddressLine2'),
                        AddressLine3=data.get('AddressLine3'),
                        AddressLine4=data.get('AddressLine4'),
                        AddressLine5=data.get('AddressLine5'),
                        AddressLocality=data.get('AddressLocality'),
                        AddressAdminArea=data.get('AddressAdminArea'),
                        AddressPostalCode=data.get('AddressPostalCode'),
                        AddressCountry=data.get('AddressCountry'),
                        AddressNoteCodes=data.get('AddressNoteCodes'),
                        AddressNoteDesc=data.get('AddressNoteDesc'),
                        EmailCertainty=data.get('EmailCertainty'),
                        EmailQuality=data.get('EmailQuality'),
                        EmailCorrected=data.get('EmailCorrected'),
                        EmailNoteCodes=data.get('EmailNoteCodes'),
                        EmailNoteDesc=data.get('EmailNoteDesc'),
                        IPCertainty=data.get('IPCertainty'),
                        IPQuality=data.get('IPQuality'),
                        IPLocality=data.get('IPLocality'),
                        IPAdminArea=data.get('IPAdminArea'),
                        IPCountry=data.get('IPCountry'),
                        IPNoteCodes=data.get('IPNoteCodes'),
                        IPNoteDesc=data.get('IPNoteDesc'),
                        Phone1Certainty=data.get('Phone1Certainty'),
                        Phone1Quality=data.get('Phone1Quality'),
                        Phone1Locality=data.get('Phone1Locality'),
                        Phone1AdminArea=data.get('Phone1AdminArea'),
                        Phone1Country=data.get('Phone1Country'),
                        Phone1NoteCodes=data.get('Phone1NoteCodes'),
                        Phone1NoteDesc=data.get('Phone1NoteDesc'),
                        Phone2Certainty=data.get('Phone2Certainty'),
                        Phone2Quality=data.get('Phone2Quality'),
                        Phone2Locality=data.get('Phone2Locality'),
                        Phone2AdminArea=data.get('Phone2AdminArea'),
                        Phone2Country=data.get('Phone2Country'),
                        Phone2NoteCodes=data.get('Phone2NoteCodes'),
                        Phone2NoteDesc=data.get('Phone2NoteDesc'),
                        BusinessCertainty=data.get('BusinessCertainty'),
                        BusinessQuality=data.get('BusinessQuality'),
                        BusinessName=data.get('BusinessName'),
                        BusinessDomain=data.get('BusinessDomain'),
                        BusinessEmail=data.get('BusinessEmail'),
                        BusinessNoteCodes=data.get('BusinessNoteCodes'),
                        BusinessNoteDesc=data.get('BusinessNoteDesc'),
                        InformationComponents=info_components,
                        PhoneContact=phone_contact,
                        Error=error
                )
    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                if 'Error' in data:
                    raise RuntimeError(f"LVI backup error: {data['Error']}") from req_exc

                # Convert JSON response to LVIResponse for structured access
                error = Error(**data.get('Error', {})) if data.get('Error') else None
                info_components = [InformationComponent(**inf) for inf in data.get('InformationComponents', [])] if data.get('InformationComponents') else None
                phone_contact = PhoneContact(**data.get('PhoneContact', {})) if data.get('PhoneContact') else None

                return LVIResponse(
                        OverallCertainty=data.get('OverallCertainty'),
                        OverallQuality=data.get('OverallQuality'),
                        LeadType=data.get('LeadType'),
                        LeadCountry=data.get('LeadCountry'),
                        NoteCodes=data.get('NoteCodes'),
                        NoteDesc=data.get('NoteDesc'),
                        NameCertainty=data.get('NameCertainty'),
                        NameQuality=data.get('NameQuality'),
                        FirstNameLatin=data.get('FirstNameLatin'),
                        LastNameLatin=data.get('LastNameLatin'),
                        FirstName=data.get('FirstName'),
                        LastName=data.get('LastName'),
                        NameNoteCodes=data.get('NameNoteCodes'),
                        NameNoteDesc=data.get('NameNoteDesc'),
                        AddressCertainty=data.get('AddressCertainty'),
                        AddressQuality=data.get('AddressQuality'),
                        AddressResolutionLevel=data.get('AddressResolutionLevel'),
                        AddressLine1=data.get('AddressLine1'),
                        AddressLine2=data.get('AddressLine2'),
                        AddressLine3=data.get('AddressLine3'),
                        AddressLine4=data.get('AddressLine4'),
                        AddressLine5=data.get('AddressLine5'),
                        AddressLocality=data.get('AddressLocality'),
                        AddressAdminArea=data.get('AddressAdminArea'),
                        AddressPostalCode=data.get('AddressPostalCode'),
                        AddressCountry=data.get('AddressCountry'),
                        AddressNoteCodes=data.get('AddressNoteCodes'),
                        AddressNoteDesc=data.get('AddressNoteDesc'),
                        EmailCertainty=data.get('EmailCertainty'),
                        EmailQuality=data.get('EmailQuality'),
                        EmailCorrected=data.get('EmailCorrected'),
                        EmailNoteCodes=data.get('EmailNoteCodes'),
                        EmailNoteDesc=data.get('EmailNoteDesc'),
                        IPCertainty=data.get('IPCertainty'),
                        IPQuality=data.get('IPQuality'),
                        IPLocality=data.get('IPLocality'),
                        IPAdminArea=data.get('IPAdminArea'),
                        IPCountry=data.get('IPCountry'),
                        IPNoteCodes=data.get('IPNoteCodes'),
                        IPNoteDesc=data.get('IPNoteDesc'),
                        Phone1Certainty=data.get('Phone1Certainty'),
                        Phone1Quality=data.get('Phone1Quality'),
                        Phone1Locality=data.get('Phone1Locality'),
                        Phone1AdminArea=data.get('Phone1AdminArea'),
                        Phone1Country=data.get('Phone1Country'),
                        Phone1NoteCodes=data.get('Phone1NoteCodes'),
                        Phone1NoteDesc=data.get('Phone1NoteDesc'),
                        Phone2Certainty=data.get('Phone2Certainty'),
                        Phone2Quality=data.get('Phone2Quality'),
                        Phone2Locality=data.get('Phone2Locality'),
                        Phone2AdminArea=data.get('Phone2AdminArea'),
                        Phone2Country=data.get('Phone2Country'),
                        Phone2NoteCodes=data.get('Phone2NoteCodes'),
                        Phone2NoteDesc=data.get('Phone2NoteDesc'),
                        BusinessCertainty=data.get('BusinessCertainty'),
                        BusinessQuality=data.get('BusinessQuality'),
                        BusinessName=data.get('BusinessName'),
                        BusinessDomain=data.get('BusinessDomain'),
                        BusinessEmail=data.get('BusinessEmail'),
                        BusinessNoteCodes=data.get('BusinessNoteCodes'),
                        BusinessNoteDesc=data.get('BusinessNoteDesc'),
                        InformationComponents=info_components,
                        PhoneContact=phone_contact,
                        Error=error
                )
            except Exception as backup_exc:
                # Both primary and backup failed; escalate
                raise RuntimeError("LVI service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"LVI trial error: {str(req_exc)}") from req_exc
