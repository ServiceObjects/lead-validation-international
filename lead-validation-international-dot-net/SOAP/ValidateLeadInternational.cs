using LVIService;

namespace lead_validation_international_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Lead Validation International SOAP service's ValidateLeadInternational operation,
    /// retrieving lead validation information (e.g., name, address, phone, email, and business details) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class ValidateLeadInternational
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/LVI/SOAP.svc/SOAP";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/LVI/SOAP.svc/SOAP";
        private const string TrailBaseUrl = "https://trial.serviceobjects.com/LVI/SOAP.svc/SOAP";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes URLs/timeout/IsLive.
        /// </summary>
        public ValidateLeadInternational(bool isLive)
        {
            _timeoutMs = 10000;
            _isLive = isLive;

            if (_isLive)
            {
                _primaryUrl = LiveBaseUrl;
                _backupUrl = BackupBaseUrl;
            }
            else
            {
                _primaryUrl = TrailBaseUrl;
                _backupUrl = TrailBaseUrl;
            }

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// Asynchronously calls the ServiceObjects Lead Validation International SOAP endpoint to validate lead information,
        /// such as name, address, phone numbers, email, and business details. Attempts the primary endpoint first and falls
        /// back to the backup endpoint if the primary call fails or returns a fatal error (Error.TypeCode == "3"). Enforces
        /// a timeout using a CancellationToken to prevent hangs.
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
        /// <param name="Phone2">The secondary phone number.</param>
        /// <param name="Email">The contact’s email address.</param>
        /// <param name="IPAddress">The contact’s IP address in IPv4. (IPv6 coming in a future release)</param>
        /// <param name="Gender">Male, Female or Neutral</param>
        /// <param name="DateOfBirth">The contact’s date of birth</param>
        /// <param name="UTCCaptureTime">The time the lead was submitted</param>
        /// <param name="OutputLanguage">Language field indicating what language some of the output information will be.</param>
        /// <param name="TestType">The name of the type of validation you want to perform on this contact.</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <returns>A <see cref="Task{ContactInternational}"/> containing a <see cref="ContactInternational"/> object with lead validation details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<ContactInternational> InvokeAsync(string FullName, string Salutation, string FirstName, string LastName,
             string BusinessName, string BusinessDomain, string BusinessEIN, string Address1, string Address2, string Address3,
             string Address4, string Address5, string Locality, string AdminArea, string PostalCode, string Country,
             string Phone1, string Phone2, string Email, string IPAddress, string Gender, string DateOfBirth, string UTCCaptureTime,
             string OutputLanguage, string TestType, string LicenseKey)
        {
            LVISoapServiceClient clientPrimary = null;
            LVISoapServiceClient clientBackup = null;

            try
            {
                // Attempt Primary_URL
                clientPrimary = new LVISoapServiceClient();
                clientPrimary.Endpoint.Address = new System.ServiceModel.EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                ContactInternational response = await clientPrimary.ValidateLeadInternationalAsync(
                    FullName, Salutation, FirstName, LastName,
                    BusinessName, BusinessDomain, BusinessEIN,
                    Address1, Address2, Address3, Address4, Address5,
                    Locality, AdminArea, PostalCode, Country,
                    Phone1, Phone2, Email, IPAddress,
                    Gender, DateOfBirth, UTCCaptureTime,
                    OutputLanguage, TestType, LicenseKey).ConfigureAwait(false);

                if (response == null || (response.Error != null && response.Error.TypeCode == "3"))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=3 error for ValidateLeadInternational");
                }
                return response;
            }
            catch (Exception primaryEx)
            {
                // If primary fails, try Backup
                try
                {
                    clientBackup = new LVISoapServiceClient();
                    clientBackup.Endpoint.Address = new System.ServiceModel.EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    ContactInternational response = await clientBackup.ValidateLeadInternationalAsync(
                    FullName, Salutation, FirstName, LastName,
                    BusinessName, BusinessDomain, BusinessEIN,
                    Address1, Address2, Address3, Address4, Address5,
                    Locality, AdminArea, PostalCode, Country,
                    Phone1, Phone2, Email, IPAddress,
                    Gender, DateOfBirth, UTCCaptureTime,
                    OutputLanguage, TestType, LicenseKey).ConfigureAwait(false);
                    return response;
                }
                catch (Exception backupEx)
                {
                    // If backup also fails, wrap both exceptions
                    throw new Exception(
                        $"Both primary and backup endpoints failed.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            finally
            {
                clientPrimary?.Close();
            }
        }

    }
}