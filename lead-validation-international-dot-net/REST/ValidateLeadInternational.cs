using System.Web;

namespace lead_validation_international_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Lead Validation International REST API's ValidateLeadInternational endpoint,
    /// retrieving lead validation information (e.g., name, address, phone, email, and business details) with fallback to a backu endpoint
    /// for reliability in live mode.
    /// </summary>
    public class ValidateLeadInternational
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/lvi/api.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/lvi/api.svc/";
        private const string TrailBaseUrl = "https://trial.serviceobjects.com/lvi/api.svc/";

        /// <summary>
        /// Synchronously calls the ValidateLeadInternational REST endpoint to retrieve lead validation information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including full name, address, phone numbers, email, and license key.</param>
        /// <returns>Deserialized <see cref="LVIResponse"/>.</returns>
        public static LVIResponse Invoke(ValidateLeadInternationalInput input)
        {
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrailBaseUrl);
            LVIResponse response = Helper.HttpGet<LVIResponse>(url, input.TimeoutSeconds);

            // Fallback on error payload in live mode
            if (input.IsLive && !IsValid(response))
            {
                var fallbackUr = BuildUrl(input, BackupBaseUrl);
                LVIResponse fallbackResponse = Helper.HttpGet<LVIResponse>(fallbackUr, input.TimeoutSeconds);
                return fallbackResponse;
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the ValidateLeadInternational REST endpoint to retrieve lead validation information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.Number == "4") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including full name, address, phone numbers, email, and license key.</param>
        /// <returns>Deserialized <see cref="LVIResponse"/>.</returns>
        public static async Task<LVIResponse> InvokeAsync(ValidateLeadInternationalInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrailBaseUrl);
            LVIResponse response = await Helper.HttpGetAsync<LVIResponse>(url, input.TimeoutSeconds).ConfigureAwait(false);
            if (input.IsLive && !IsValid(response))
            {
                var fallbackUrl = BuildUrl(input, BackupBaseUrl);
                LVIResponse fallbackResponse = await Helper.HttpGetAsync<LVIResponse>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return fallbackResponse;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded query string
        public static string BuildUrl(ValidateLeadInternationalInput input, string baseUrl)
        {
            var qs = $"JSON/ValidateLeadInternational?FullName={HttpUtility.UrlEncode(input.FullName)}" +
                     $"&Salutation={HttpUtility.UrlEncode(input.Salutation)}" +
                     $"&FirstName={HttpUtility.UrlEncode(input.FirstName)}" +
                     $"&LastName={HttpUtility.UrlEncode(input.LastName)}" +
                     $"&BusinessName={HttpUtility.UrlEncode(input.BusinessName)}" +
                     $"&BusinessDomain={HttpUtility.UrlEncode(input.BusinessDomain)}" +
                     $"&BusinessEIN={HttpUtility.UrlEncode(input.BusinessEIN)}" +
                     $"&Address1={HttpUtility.UrlEncode(input.Address1)}" +
                     $"&Address2={HttpUtility.UrlEncode(input.Address2)}" +
                     $"&Address3={HttpUtility.UrlEncode(input.Address3)}" +
                     $"&Address4={HttpUtility.UrlEncode(input.Address4)}" +
                     $"&Address5={HttpUtility.UrlEncode(input.Address5)}" +
                     $"&Locality={HttpUtility.UrlEncode(input.Locality)}" +
                     $"&AdminArea={HttpUtility.UrlEncode(input.AdminArea)}" +
                     $"&PostalCode={HttpUtility.UrlEncode(input.PostalCode)}" +
                     $"&Country={HttpUtility.UrlEncode(input.Country)}" +
                     $"&Phone1={HttpUtility.UrlEncode(input.Phone1)}" +
                     $"&Phone2={HttpUtility.UrlEncode(input.Phone2)}" +
                     $"&Email={HttpUtility.UrlEncode(input.Email)}" +
                     $"&IPAddress={HttpUtility.UrlEncode(input.IPAddress)}" +
                     $"&Gender={HttpUtility.UrlEncode(input.Gender)}" +
                     $"&DateOfBirth={HttpUtility.UrlEncode(input.DateOfBirth)}" +
                     $"&UTCCaptureTime={HttpUtility.UrlEncode(input.UTCCaptureTime)}" +
                     $"&OutputLanguage={HttpUtility.UrlEncode(input.OutputLanguage)}" +
                     $"&TestType={HttpUtility.UrlEncode(input.TestType)}" +
                     $"&LicenseKey={HttpUtility.UrlEncode(input.LicenseKey)}";
            return baseUrl + qs;
        }

        private static bool IsValid(LVIResponse response) => response?.Error == null || response.Error.TypeCode != "3";

        /// <summary>
        /// Lead Validation International (LVI) evaluates international lead data and scores the data quality into pass/fail/review categories. By evaluating the information quality of a contact, online marketers can more effectively weed-out fraudulent contacts.Online fraudsters are more likely to provide inaccurate contact information because the address and phone number can be easily traced. Unlike other validation services that perform simple data checks on single variables, Service Objects Lead Validation solution is able to cross-validate that a contact’s name, address, phone numbers, e-mail and IP address are all matched each other and are related to the consumer.
        /// </summary>
        /// <param name="FullName">The contact’s full name. e.g. Jane Doe</param>
        /// <param name="Salutation">Salutation of the contact. Dr, Esq, Mr, Mrs etc</param>
        /// <param name="FirstName">First name of the contact. e.g. Jane</param>
        /// <param name="LastName">Last name of the contact. e.g. Doe</param>
        /// <param name="BusinessName">The contacts company. e.g. Service Objects</param>
        /// <param name="BusinessDomain">Website domain associated with the business. e.g. serviceobjects.com</param>
        /// <param name="BusinessEIN">Represents the Company Tax Number. Used for Tax exempt checks for US leads.</param>
        /// <param name="Address1">The address 1 of the contact or business address.</param>
        /// <param name="Address2">The address 2 of the contact or business address.</param>
        /// <param name="Address3">The address 3 of the contact or business address.</param>
        /// <param name="Address4">The address 4 of the contact or business address.</param>
        /// <param name="Address5">The address 5 of the contact or business address.</param>
        /// <param name="Locality">The city of the contact’s postal address.</param>
        /// <param name="AdminArea">The state of the contact’s postal address.</param>
        /// <param name="PostalCode">The zip code of the contact’s postal address.</param>
        /// <param name="Country">The country of the contact’s postal address. e.g. United States, US or USA</param>
        /// <param name="Phone1">The contact’s primary phone number.</param>
        /// <param name="Phone2">The contact’s secondary phone number.</param>
        /// <param name="Email">The contact’s email address.</param>
        /// <param name="IPAddress">The contact’s IP address in IPv4. (IPv6 coming in a future release)</param>
        /// <param name="Gender">Male, Female or Neutral</param>
        /// <param name="DateOfBirth">The contact’s date of birth</param>
        /// <param name="UTCCaptureTime">The time the lead was submitted</param>
        /// <param name="OutputLanguage">Language field indicating what language some of the output information will be.</param>
        /// <param name="TestType">The name of the type of validation you want to perform on this contact.</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <param name="IsLive">Value to determine whether to use the live or trial servers</param>
        /// <param name="TimeoutSeconds">Timeout, in seconds, for the call to the service.  </param>

        public record ValidateLeadInternationalInput(
            string FullName = "",
            string Salutation = "",
            string FirstName = "",
            string LastName = "",
            string BusinessName = "",
            string BusinessDomain = "",
            string BusinessEIN = "",
            string Address1 = "",
            string Address2 = "",
            string Address3 = "",
            string Address4 = "",
            string Address5 = "",
            string Locality = "",
            string AdminArea = "",
            string PostalCode = "",
            string Country = "",
            string Phone1 = "",
            string Phone2 = "",
            string Email = "",
            string IPAddress = "",
            string Gender = "",
            string DateOfBirth = "",
            string UTCCaptureTime = "",
            string OutputLanguage = "",
            string TestType = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}
