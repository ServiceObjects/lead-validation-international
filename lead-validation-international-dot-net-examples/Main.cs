using lead_validation_international_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = false;

//Lead Validation International - ValidateLeadInternational - REST SDK
await ValidateLeadInternationalRestSdkExample.Go(LicenseKey, IsProductionKey);

//Lead Validation International - ValidateLeadInternational - SOAP SDK
await ValidateLeadInternationalSoapSdkExample.Go(LicenseKey, IsProductionKey);
