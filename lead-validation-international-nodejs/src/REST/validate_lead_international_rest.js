import axios from 'axios';
import querystring from 'querystring';
import { LVIResponse } from './lvi_response.js';

/**
* @constant
* @type {string}
* @description The base URL for the live ServiceObjects Lead Validation International API service.
*/
const LiveBaseUrl = 'https://sws.serviceobjects.com/lvi/api.svc/';

/**
* @constant
* @type {string}
* @description The base URL for the backup ServiceObjects Lead Validation International API service.
*/
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/lvi/api.svc/';

/**
* @constant
* @type {string}
* @description The base URL for the trial ServiceObjects Lead Validation International API service.
*/
const TrialBaseUrl = 'https://trial.serviceobjects.com/lvi/api.svc/';

/**
* <summary>
* Checks if a response from the API is valid by verifying that it either has no Error object
* or the Error.Number is not equal to '4'.
* </summary>
* <param name="response" type="Object">The API response object to validate.</param>
* <returns type="boolean">True if the response is valid, false otherwise.</returns>
*/
const isValid = (response) => !response?.Error || response.Error.TypeCode !== '4';

/**
* <summary>
* Constructs a full URL for the ValidateLeadInternational API endpoint by combining the base URL
* with query parameters derived from the input parameters.
* </summary>
* <param name="params" type="Object">An object containing all the input parameters.</param>
* <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
* <returns type="string">The constructed URL with query parameters.</returns>
*/
const buildUrl = (params, baseUrl) =>
    `${baseUrl}JSON/ValidateLeadInternational?${querystring.stringify(params)}`;

/**
* <summary>
* Performs an HTTP GET request to the specified URL with a given timeout.
* </summary>
* <param name="url" type="string">The URL to send the GET request to.</param>
* <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
* <returns type="Promise<LVIResponse>">A promise that resolves to an LVIResponse object containing the API response data.</returns>
* <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
*/
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new LVIResponse(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
* <summary>
* Provides functionality to call the ServiceObjects Lead Validation International API's ValidateLeadInternational endpoint,
* retrieving lead validation information with fallback to a backup endpoint for reliability in live mode.
* </summary>
*/
const ValidateLeadInternationalClient = {
    /**
    * <summary>
    * Asynchronously invokes the ValidateLeadInternational API endpoint, attempting the primary endpoint
    * first and falling back to the backup if the response is invalid (Error.Number == '4') in live mode.
    * </summary>
    /**
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
    async invokeAsync(
        FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
        Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
        Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey,
        isLive, timeoutSeconds
    ) {
        const params = {
            FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
            Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
            Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds || 15);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds || 15);
            return fallbackResponse;
        }

        return response;
    },

    /**
    * <summary>
    * Synchronously invokes the ValidateLeadInternational API endpoint by wrapping the async call
    * and awaiting its result immediately.
    * </summary>
    * @returns {LVIResponse} - An LVIResponse object with lead validation details or an error.
    */
    invoke(
        FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
        Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
        Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey,
        isLive, timeoutSeconds
    ) {
        return (async () => await this.invokeAsync(
            FullName, Salutation, FirstName, LastName, BusinessName, BusinessDomain, BusinessEIN,
            Address1, Address2, Address3, Address4, Address5, Locality, AdminArea, PostalCode, Country,
            Phone1, Phone2, Email, IPAddress, Gender, DateOfBirth, UTCCaptureTime, OutputLanguage, TestType, LicenseKey,
            isLive, timeoutSeconds
        ))();
    }
};

export { ValidateLeadInternationalClient, LVIResponse };
