import { validateLeadInternationalGo } from "./validate_lead_international_rest_example.js";
import { validateLeadInternationalSoapGo } from "./validate_lead_international_soap_example.js";

async function main() {
  //Your license key from Service Objects.
  //Trial license keys will only work on the
  //trail environments and production license
  //keys will only owork on production environments.
  const licenseKey = "LICENSE KEY";
  const isLive = true;

  //Lead Validation International - ValidateLeadInternational - REST SDK
  validateLeadInternationalGo(licenseKey, isLive);

  //Lead Validation International - ValidateLeadInternational - SOAP SDK
  validateLeadInternationalSoapGo(licenseKey, isLive);
}
main().catch((err) => console.error("Error:", err));
