from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object

class ValidateLeadInternational:
    def __init__(self, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects GeoPhone license key.
        is_live: whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """
        self._timeout_s = timeout_ms / 1000.0  # Convert to seconds
        self._is_live = is_live
        self.license_key = license_key

        # WSDL URLs for primary and backup endpoints 
        self._primary_wsdl = (
            "https://sws.serviceobjects.com/LVI/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/LVI/soap.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/LVI/soap.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/LVI/soap.svc?wsdl"
        )

    def validate_lead_international(
                                  self,
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
                                  test_type: str
                                ) -> Object:
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


        # Common kwargs for both calls
        call_kwargs = dict(
            FullName=full_name,
            Salutation=salutation,
            FirstName=first_name,
            LastName=last_name,
            BusinessName=business_name,
            BusinessDomain=business_domain,
            BusinessEIN=business_EIN,
            Address1=address_line1,
            Address2=address_line2,
            Address3=address_line3,
            Address4=address_line4,
            Address5=address_line5,
            Locality=locality,
            AdminArea=admin_area,
            PostalCode=postal_code,
            Country=country,
            Phone1=phone1,
            Phone2=phone2,
            Email=email,
            IPAddress=ip_address,
            Gender=gender, 
            DateOfBirth=date_of_birth,
            UTCCaptureTime=utc_capture_time,
            OutputLanguage=output_language,
            TestType=test_type,
            LicenseKey=self.license_key,
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl, timeout=self._timeout_s)

                # Override endpoint URL if needed:
            response = client.service.ValidateLeadInternational(**call_kwargs)

            # If response is None or fatal error code, trigger fallback
            if response is None or (hasattr(response, 'Error') and response.Error and response.Error.Number == '3'):
                    raise ValueError("Primary returned no result or fatal Error.Number=4")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
                # Attempt backup
            try:
                client = Client(self._backup_wsdl, timeout=self._timeout_s)
                response = client.service.ValidateLeadInternational(**call_kwargs)

                if response is None:
                    raise ValueError("Backup returned no result")
                return response
            except (WebFault,Exception) as backup_ex:
                # Raise a combined error if both attempts fail
                msg = (
                    "Both primary and backup endpoints failed.\n"
                    f"Primary error: {str(primary_ex)}\n"
                    f"Backup error: {str(backup_ex)}"
                )
                raise RuntimeError(msg)
