
from validate_lead_international_rest_example import validate_lead_international_rest_sdk_go
from validate_lead_international_soap_example import validate_lead_international_soap_sdk_go

if __name__ == "__main__":  

  # Your license key from Service Objects.  
  # Trial license keys will only work on the trial environments and production  
  # license keys will only work on production environments.  
  license_key = "LICENSE KEY"  

  is_live_license_key = True 

  # Lead Validation International - ValidateLeadInternational - REST SDK
  validate_lead_international_rest_sdk_go(license_key, is_live_license_key)

  # Lead Validation International - ValidateLeadInternational - SOAP SDK
  validate_lead_international_soap_sdk_go(license_key, is_live_license_key)
