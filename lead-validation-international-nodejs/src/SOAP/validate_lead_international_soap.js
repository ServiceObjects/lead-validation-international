import { LVIResponse } from "../SOAP/lvi_response.js";
import { soap } from "strong-soap";

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects Lead Validation International SOAP service's ValidateLeadInternational endpoint,
 * retrieving lead validation information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
class ValidateLeadInternationalSoap {
    /**
    * <summary>    
    * Initializes a new instance of the ValidateLeadInternationalSoap class with the provided input parameters,
    * setting up primary and backup WSDL URLs based on the live/trial mode.
    * </summary>
    * @param {string} full_name - The contact’s full name. e.g. Jane Doe
    * @param {string} salutation - Salutation of the contact. Dr, Esq, Mr, Mrs etc
    * @param {string} first_name - First name of the contact. e.g. Jane
    * @param {string} last_name - Last name of the contact. e.g. Doe
    * @param {string} business_name - The contact's company. e.g. Service Objects
    * @param {string} business_domain - Website domain associated with the business. e.g. serviceobjects.com
    * @param {string} business_EIN - Represents the Company Tax Number. Used for Tax exempt checks for US leads.
    * @param {string} address_line1 - The address 1 of the contact or business address.
    * @param {string} address_line2 - The address 2 of the contact or business address.
    * @param {string} address_line3 - The address 3 of the contact or business address.
    * @param {string} address_line4 - The address 4 of the contact or business address.
    * @param {string} address_line5 - The address 5 of the contact or business address.
    * @param {string} locality - The city of the contact’s postal address.
    * @param {string} admin_area - The state of the contact’s postal address.
    * @param {string} postal_code - The zip code of the contact’s postal address.
    * @param {string} country - The country of the contact’s postal address. e.g. United States, US or USA
    * @param {string} phone1 - The contact’s primary phone number.
    * @param {string} phone2 - The contact’s secondary phone number.
    * @param {string} email - The contact’s email address.
    * @param {string} ip_address - The contact’s IP address in IPv4. (IPv6 coming in a future release)
    * @param {string} gender - Male, Female or Neutral
    * @param {string} date_of_birth - The contact’s date of birth
    * @param {string} utc_capture_time - The time the lead was submitted
    * @param {string} output_language - Language field indicating what language some of the output information will be.
    * @param {string} test_type - The name of the type of validation you want to perform on this contact.
    * @param {string} license_key - Your license key to use the service.
    * @param {boolean} is_live - Value to determine whether to use the live or trial servers
    * @param {number} timeout_seconds - Timeout, in seconds, for the call to the service.
    * 
    * @returns {Promise<LVIResponse>} - A promise that resolves to an LVIResponse object.
    */
    constructor(
        FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
        Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
        Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey,
        isLive, timeoutSeconds
    ) {
        if (!LicenseKey) throw new Error("LicenseKey cannot be empty or null.");

        this.args = {
            FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
            Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
            Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.LiveBaseUrl = "https://sws.serviceobjects.com/LVI/soap.svc?wsdl";
        this.BackupBaseUrl = "https://swsbackup.serviceobjects.com/LVI/soap.svc?wsdl";
        this.TrialBaseUrl = "https://trial.serviceobjects.com/LVI/soap.svc?wsdl";

        this._primaryWsdl = this.isLive ? this.LiveBaseUrl : this.TrialBaseUrl;
        this._backupWsdl = this.isLive ? this.BackupBaseUrl : this.TrialBaseUrl;
    }

    /**
     * <summary>
     * Asynchronously calls the ValidateLeadInternational SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.Number == "4") in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<LVIResponse>">A promise that resolves to an LVIResponse object containing lead validation details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with detailed error messages.</exception>
     */
    async validateLeadInternational() {
        try {
            const primaryResult = await this._callSoap(this._primaryWsdl, this.args);

            if (this.isLive && !this._isValid(primaryResult)) {
                console.warn("Primary returned Error.Number == '4', falling back to backup...");
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            }

            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(`Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`);
            }
        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into an LVIResponse object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the ValidateLeadInternational method.</param>
     * <returns type="Promise<LVIResponse>">A promise that resolves to an LVIResponse object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoap(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(wsdlUrl, { timeout: this.timeoutSeconds * 1000 }, (err, client) => {
                if (err) return reject(err);

                client.ValidateLeadInternational(args, (err, result) => {
                    if (err) return reject(err);
                    const rawData = result.ValidateLeadInternationalResult;
                    try {
                        if (!rawData) {
                            return reject(new Error("SOAP response is empty or undefined."));
                        }
                        const parsed = new LVIResponse(rawData);
                        resolve(parsed);
                    } catch (parseErr) {
                        reject(new Error(`Failed to parse SOAP response: ${parseErr.message}`));
                    }
                });
            });
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.Number is not equal to '4'.
     * </summary>
     * <param name="response" type="LVIResponse">The LVIResponse object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.TypeCode !== "4");
    }
}

export { ValidateLeadInternationalSoap };
