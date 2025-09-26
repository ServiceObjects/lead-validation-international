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
    * @param {string} fullName - The contact’s full name. e.g. Jane Doe
    * @param {string} salutation - Salutation of the contact. Dr, Esq, Mr, Mrs etc
    * @param {string} firstName - First name of the contact. e.g. Jane
    * @param {string} lastName - Last name of the contact. e.g. Doe
    * @param {string} businessName - The contact's company. e.g. Service Objects
    * @param {string} businessDomain - Website domain associated with the business. e.g. serviceobjects.com
    * @param {string} businessEIN - Represents the Company Tax Number. Used for Tax exempt checks for US leads.
    * @param {string} addressLine1 - The address 1 of the contact or business address.
    * @param {string} addressLine2 - The address 2 of the contact or business address.
    * @param {string} addressLine3 - The address 3 of the contact or business address.
    * @param {string} addressLine4 - The address 4 of the contact or business address.
    * @param {string} addressLine5 - The address 5 of the contact or business address.
    * @param {string} locality - The city of the contact’s postal address.
    * @param {string} adminArea - The state of the contact’s postal address.
    * @param {string} postalCode - The zip code of the contact’s postal address.
    * @param {string} country - The country of the contact’s postal address. e.g. United States, US or USA
    * @param {string} phone1 - The contact’s primary phone number.
    * @param {string} phone2 - The contact’s secondary phone number.
    * @param {string} email - The contact’s email address.
    * @param {string} ipAddress - The contact’s IP address in IPv4. (IPv6 coming in a future release)
    * @param {string} gender - Male, Female or Neutral
    * @param {string} dateOfBirth - The contact’s date of birth
    * @param {string} utcCaptureTime - The time the lead was submitted
    * @param {string} outputLanguage - Language field indicating what language some of the output information will be.
    * @param {string} testType - The name of the type of validation you want to perform on this contact.
    * @param {string} licenseKey - Your license key to use the service.
    * @param {boolean} isLive - Value to determine whether to use the live or trial servers
    * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
    * 
    * @returns {Promise<LVIResponse>} - A promise that resolves to an LVIResponse object.
    */
    constructor(
        fullName, salutation, firstName, lastName, businessName, businessDomain, businessEIN,
        address1, address2, address3, address4, address5, aocality, adminArea, postalCode, country,
        phone1, phone2, email, ipAddress, gender, dateOfBirth, utcCaptureTime, outputLanguage, testType, licenseKey,
        isLive, timeoutSeconds
    ) {

        this.args = {
            fullName, salutation, firstName, lastName, businessName, businessDomain, businessEIN,
            address1, address2, address3, address4, address5, aocality, adminArea, postalCode, country,
            phone1, phone2, email, ipAddress, gender, dateOfBirth, utcCaptureTime, outputLanguage, testType, licenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.liveBaseUrl = "https://sws.serviceobjects.com/LVI/soap.svc?wsdl";
        this.backupBaseUrl = "https://swsbackup.serviceobjects.com/LVI/soap.svc?wsdl";
        this.trialBaseUrl = "https://trial.serviceobjects.com/LVI/soap.svc?wsdl";

        this._primaryWsdl = this.isLive ? this.liveBaseUrl : this.trialBaseUrl;
        this._backupWsdl = this.isLive ? this.backupBaseUrl : this.trialBaseUrl;
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
                        resolve(rawData);
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
