using lead_validation_international_dot_net.SOAP;

namespace lead_validation_international_dot_net_examples
{
    public class ValidateLeadInternationalSoapSdkExample
    {
        public static async Task Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n-----------------------------------------------------------------------");
            Console.WriteLine("LeadValidationInternational - ValidateLeadInternationalInput - SOAP SDK");
            Console.WriteLine("-----------------------------------------------------------------------");

            string FullName = "Tim Cook";
            string Salutation = "";
            string FirstName = "Tim";
            string LastName = "Cook";
            string BusinessName = "Apple";
            string BusinessDomain = "apple.com";
            string BusinessEIN = "";
            string Address1 = "1 Infinite Loop";
            string Address2 = "";
            string Address3 = "";
            string Address4 = "";
            string Address5 = "";
            string Locality = "Cupertino";
            string AdminArea = "CA";
            string PostalCode = "95014-2083";
            string Country = "USA";
            string Phone1 = "1-408-996-1010";
            string Phone2 = "";
            string Email = "tim@apple.com";
            string IPAddress = "";
            string Gender = "M";
            string DateOfBirth = "";
            string UTCCaptureTime = "2025-08-01T12:00:00Z";
            string OutputLanguage = "English";
            string TestType = "business-noip";
            string LicenseKey = licenseKey;


            Console.WriteLine("\r\n* Input *\r\n");

            Console.WriteLine($"Full Name      : {FullName}");
            Console.WriteLine($"Salutation     : {Salutation}");
            Console.WriteLine($"First Name     : {FirstName}");
            Console.WriteLine($"Last Name      : {LastName}");
            Console.WriteLine($"Business Name  : {BusinessName}");
            Console.WriteLine($"Business Domain: {BusinessDomain}");
            Console.WriteLine($"Business EIN   : {BusinessEIN}");
            Console.WriteLine($"Address 1      : {Address1}");
            Console.WriteLine($"Address 2      : {Address2}");
            Console.WriteLine($"Address 3      : {Address3}");
            Console.WriteLine($"Address 4      : {Address4}");
            Console.WriteLine($"Address 5      : {Address5}");
            Console.WriteLine($"Locality       : {Locality}");
            Console.WriteLine($"Admin Area     : {AdminArea}");
            Console.WriteLine($"Postal Code    : {PostalCode}");
            Console.WriteLine($"Country        : {Country}");
            Console.WriteLine($"Phone 1        : {Phone1}");
            Console.WriteLine($"Phone 2        : {Phone2}");
            Console.WriteLine($"Email          : {Email}");
            Console.WriteLine($"IP Address     : {IPAddress}");
            Console.WriteLine($"Gender         : {Gender}");
            Console.WriteLine($"Date of Birth  : {DateOfBirth}");
            Console.WriteLine($"UTC Capture    : {UTCCaptureTime}");
            Console.WriteLine($"Output Language: {OutputLanguage}");
            Console.WriteLine($"Test Type      : {TestType}");
            Console.WriteLine($"Is Live        : {isLive}");
            Console.WriteLine($"License Key    : {LicenseKey}");

            ValidateLeadInternational validateLeadInternational = new ValidateLeadInternational(isLive);
            LVIService.ContactInternational response = validateLeadInternational.InvokeAsync(
                FullName, Salutation, FirstName, LastName,
                BusinessName, BusinessDomain, BusinessEIN,
                Address1, Address2, Address3, Address4, Address5,
                Locality, AdminArea, PostalCode, Country,
                Phone1, Phone2, Email, IPAddress,
                Gender, DateOfBirth, UTCCaptureTime,
                OutputLanguage, TestType, LicenseKey).Result;

            if (response.Error is null)
            {
                Console.WriteLine("\r\n* Lead Details *\r\n");

                Console.WriteLine($"Overall Certainty     : {response.OverallCertainty}");
                Console.WriteLine($"Overall Quality       : {response.OverallQuality}");
                Console.WriteLine($"Lead Type             : {response.LeadType}");
                Console.WriteLine($"Lead Country          : {response.LeadCountry}");
                Console.WriteLine($"Note Codes            : {response.NoteCodes}");
                Console.WriteLine($"Note Descriptions     : {response.NoteDesc}");

                Console.WriteLine("\r\n* Name Details *\r\n");
                Console.WriteLine($"Name Certainty        : {response.NameCertainty}");
                Console.WriteLine($"Name Quality          : {response.NameQuality}");
                Console.WriteLine($"First Name            : {response.FirstName}");
                Console.WriteLine($"Last Name             : {response.LastName}");
                Console.WriteLine($"First Name Latin      : {response.FirstNameLatin}");
                Console.WriteLine($"Last Name Latin       : {response.LastNameLatin}");
                Console.WriteLine($"Name Note Codes       : {response.NameNoteCodes}");
                Console.WriteLine($"Name Note Descriptions: {response.NameNoteDesc}");

                Console.WriteLine("\r\n* Address Details *\r\n");
                Console.WriteLine($"Address Certainty     : {response.AddressCertainty}");
                Console.WriteLine($"Address Quality       : {response.AddressQuality}");
                Console.WriteLine($"Address Line 1        : {response.AddressLine1}");
                Console.WriteLine($"Address Line 2        : {response.AddressLine2}");
                Console.WriteLine($"Address Line 3        : {response.AddressLine3}");
                Console.WriteLine($"Address Line 4        : {response.AddressLine4}");
                Console.WriteLine($"Address Line 5        : {response.AddressLine5}");
                Console.WriteLine($"Address Locality      : {response.AddressLocality}");
                Console.WriteLine($"Address Admin Area    : {response.AddressAdminArea}");
                Console.WriteLine($"Address Postal Code   : {response.AddressPostalCode}");
                Console.WriteLine($"Address Country       : {response.AddressCountry}");
                Console.WriteLine($"Address Resolution    : {response.AddressResolutionLevel}");
                Console.WriteLine($"Address Note Codes    : {response.AddressNoteCodes}");
                Console.WriteLine($"Address Note Desc     : {response.AddressNoteDesc}");

                Console.WriteLine("\r\n*  Email Details *\r\n");
                Console.WriteLine($"Email Certainty       : {response.EmailCertainty}");
                Console.WriteLine($"Email Quality         : {response.EmailQuality}");
                Console.WriteLine($"Email Corrected       : {response.EmailCorrected}");
                Console.WriteLine($"Email Note Codes      : {response.EmailNoteCodes}");
                Console.WriteLine($"Email Note Desc       : {response.EmailNoteDesc}");

                Console.WriteLine("\r\n*  IP Address Details *\r\n");
                Console.WriteLine($"IP Certainty          : {response.IPCertainty}");
                Console.WriteLine($"IP Quality            : {response.IPQuality}");
                Console.WriteLine($"IP Country            : {response.IPCountry}");
                Console.WriteLine($"IP Locality           : {response.IPLocality}");
                Console.WriteLine($"IP Admin Area         : {response.IPAdminArea}");
                Console.WriteLine($"IP Note Codes         : {response.IPNoteCodes}");
                Console.WriteLine($"IP Note Descriptions  : {response.IPNoteDesc}");

                Console.WriteLine("\r\n*  Phone Details *\r\n");
                Console.WriteLine($"Phone 1 Certainty     : {response.Phone1Certainty}");
                Console.WriteLine($"Phone 1 Quality       : {response.Phone1Quality}");
                Console.WriteLine($"Phone 1 Locality      : {response.Phone1Locality}");
                Console.WriteLine($"Phone 1 Admin Area    : {response.Phone1AdminArea}");
                Console.WriteLine($"Phone 1 Country       : {response.Phone1Country}");
                Console.WriteLine($"Phone 1 Note Codes    : {response.Phone1NoteCodes}");
                Console.WriteLine($"Phone 1 Note Desc     : {response.Phone1NoteDesc}");

                Console.WriteLine($"Phone 2 Certainty     : {response.Phone2Certainty}");
                Console.WriteLine($"Phone 2 Quality       : {response.Phone2Quality}");
                Console.WriteLine($"Phone 2 Locality      : {response.Phone2Locality}");
                Console.WriteLine($"Phone 2 Admin Area    : {response.Phone2AdminArea}");
                Console.WriteLine($"Phone 2 Country       : {response.Phone2Country}");
                Console.WriteLine($"Phone 2 Note Codes    : {response.Phone2NoteCodes}");
                Console.WriteLine($"Phone 2 Note Desc     : {response.Phone2NoteDesc}");

                Console.WriteLine("\r\n* Business Details *\r\n");
                Console.WriteLine($"Business Certainty    : {response.BusinessCertainty}");
                Console.WriteLine($"Business Quality      : {response.BusinessQuality}");
                Console.WriteLine($"Business Name         : {response.BusinessName}");
                Console.WriteLine($"Business Domain       : {response.BusinessDomain}");
                Console.WriteLine($"Business Email        : {response.BusinessEmail}");
                Console.WriteLine($"Business Note Codes   : {response.BusinessNoteCodes}");
                Console.WriteLine($"Business Note Desc    : {response.BusinessNoteDesc}");

                Console.WriteLine("\r\n* Phone Contact *\r\n");

                if (response.PhoneContact != null)
                {
                    Console.WriteLine($"Name   : {response.PhoneContact.Name}");
                    Console.WriteLine($"Address: {response.PhoneContact.Address}");
                    Console.WriteLine($"City   : {response.PhoneContact.City}");
                    Console.WriteLine($"State  : {response.PhoneContact.State}");
                    Console.WriteLine($"Zip    : {response.PhoneContact.Zip}");
                    Console.WriteLine($"Type   : {response.PhoneContact.Type}");
                    Console.WriteLine("\r\n");
                }
                else
                {
                    Console.WriteLine("No phone contact returned.");
                }

                Console.WriteLine("* Information Components *\r\n");

                if (response.InformationComponents?.Length > 0)
                {
                    foreach (var component in response.InformationComponents)
                    {
                        Console.WriteLine($"Name : {component.Name}");
                        Console.WriteLine($"Value: {component.Value}");
                        Console.WriteLine("\r\n");
                    }
                }
                else
                {
                    Console.WriteLine("No information components returned.");
                }
            }
            else
            {
                Console.WriteLine("\r\n* Error *\r\n");

                Console.WriteLine($"Error Type       : {response.Error.Type}");
                Console.WriteLine($"Error Type Code  : {response.Error.TypeCode}");
                Console.WriteLine($"Error Description: {response.Error.Desc}");
                Console.WriteLine($"Error Desc Code  : {response.Error.DescCode}");
            }
        }
    }
}
