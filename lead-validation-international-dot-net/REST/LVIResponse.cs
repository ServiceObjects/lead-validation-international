using System.Runtime.Serialization;
using System.Linq;

namespace lead_validation_international_dot_net.REST
{
    /// <summary>
    /// Response object for the Lead Validation International REST API, containing information components and phone contact details.
    /// </summary>
    [DataContract]
    public class LVIResponse
    {
        public string OverallCertainty { get; set; }
        public string OverallQuality { get; set; }
        public string LeadType { get; set; }
        public string LeadCountry { get; set; }
        public string NoteCodes { get; set; }
        public string NoteDesc { get; set; }
        public string NameCertainty { get; set; }
        public string NameQuality { get; set; }
        public string FirstNameLatin { get; set; }
        public string LastNameLatin { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NameNoteCodes { get; set; }
        public string NameNoteDesc { get; set; }
        public string AddressCertainty { get; set; }
        public string AddressQuality { get; set; }
        public string AddressResolutionLevel { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public string AddressLine4 { get; set; }
        public string AddressLine5 { get; set; }
        public string AddressLocality { get; set; }
        public string AddressAdminArea { get; set; }
        public string AddressPostalCode { get; set; }
        public string AddressCountry { get; set; }
        public string AddressNoteCodes { get; set; }
        public string AddressNoteDesc { get; set; }
        public string EmailCertainty { get; set; }
        public string EmailQuality { get; set; }
        public string EmailCorrected { get; set; }
        public string EmailNoteCodes { get; set; }
        public string EmailNoteDesc { get; set; }
        public string IPCertainty { get; set; }
        public string IPQuality { get; set; }
        public string IPLocality { get; set; }
        public string IPAdminArea { get; set; }
        public string IPCountry { get; set; }
        public string IPNoteCodes { get; set; }
        public string IPNoteDesc { get; set; }
        public string Phone1Certainty { get; set; }
        public string Phone1Quality { get; set; }
        public string Phone1Locality { get; set; }
        public string Phone1AdminArea { get; set; }
        public string Phone1Country { get; set; }
        public string Phone1NoteCodes { get; set; }
        public string Phone1NoteDesc { get; set; }
        public string Phone2Certainty { get; set; }
        public string Phone2Quality { get; set; }
        public string Phone2Locality { get; set; }
        public string Phone2AdminArea { get; set; }
        public string Phone2Country { get; set; }
        public string Phone2NoteCodes { get; set; }
        public string Phone2NoteDesc { get; set; }
        public string BusinessCertainty { get; set; }
        public string BusinessQuality { get; set; }
        public string BusinessName { get; set; }
        public string BusinessDomain { get; set; }
        public string BusinessEmail { get; set; }
        public string BusinessNoteCodes { get; set; }
        public string BusinessNoteDesc { get; set; }
        public InformationComponent[] InformationComponents { get; set; }
        public PhoneContact PhoneContact { get; set; }
        public Error Error { get; set; }

        public override string ToString()
        {
            string informationComponents = InformationComponents?.Any() == true
                ? string.Join(", ", InformationComponents.Select(c => c.ToString()))
                : "None";
            string phoneContact = PhoneContact != null ? PhoneContact.ToString() : "None";
            string error = Error != null ? Error.ToString() : "None";

            return $"LVI Response: OverallCertainty = {OverallCertainty}, OverallQuality = {OverallQuality}, " +
                   $"LeadType = {LeadType}, LeadCountry = {LeadCountry}, NoteCodes = {NoteCodes}, NoteDesc = {NoteDesc}, " +
                   $"NameCertainty = {NameCertainty}, NameQuality = {NameQuality}, FirstNameLatin = {FirstNameLatin}, " +
                   $"LastNameLatin = {LastNameLatin}, FirstName = {FirstName}, LastName = {LastName}, " +
                   $"NameNoteCodes = {NameNoteCodes}, NameNoteDesc = {NameNoteDesc}, AddressCertainty = {AddressCertainty}, " +
                   $"AddressQuality = {AddressQuality}, AddressResolutionLevel = {AddressResolutionLevel}, " +
                   $"AddressLine1 = {AddressLine1}, AddressLine2 = {AddressLine2}, AddressLine3 = {AddressLine3}, " +
                   $"AddressLine4 = {AddressLine4}, AddressLine5 = {AddressLine5}, AddressLocality = {AddressLocality}, " +
                   $"AddressAdminArea = {AddressAdminArea}, AddressPostalCode = {AddressPostalCode}, " +
                   $"AddressCountry = {AddressCountry}, AddressNoteCodes = {AddressNoteCodes}, AddressNoteDesc = {AddressNoteDesc}, " +
                   $"EmailCertainty = {EmailCertainty}, EmailQuality = {EmailQuality}, EmailCorrected = {EmailCorrected}, " +
                   $"EmailNoteCodes = {EmailNoteCodes}, EmailNoteDesc = {EmailNoteDesc}, IPCertainty = {IPCertainty}, " +
                   $"IPQuality = {IPQuality}, IPLocality = {IPLocality}, IPAdminArea = {IPAdminArea}, IPCountry = {IPCountry}, " +
                   $"IPNoteCodes = {IPNoteCodes}, IPNoteDesc = {IPNoteDesc}, Phone1Certainty = {Phone1Certainty}, " +
                   $"Phone1Quality = {Phone1Quality}, Phone1Locality = {Phone1Locality}, Phone1AdminArea = {Phone1AdminArea}, " +
                   $"Phone1Country = {Phone1Country}, Phone1NoteCodes = {Phone1NoteCodes}, Phone1NoteDesc = {Phone1NoteDesc}, " +
                   $"Phone2Certainty = {Phone2Certainty}, Phone2Quality = {Phone2Quality}, Phone2Locality = {Phone2Locality}, " +
                   $"Phone2AdminArea = {Phone2AdminArea}, Phone2Country = {Phone2Country}, Phone2NoteCodes = {Phone2NoteCodes}, " +
                   $"Phone2NoteDesc = {Phone2NoteDesc}, BusinessCertainty = {BusinessCertainty}, BusinessQuality = {BusinessQuality}, " +
                   $"BusinessName = {BusinessName}, BusinessDomain = {BusinessDomain}, BusinessEmail = {BusinessEmail}, " +
                   $"BusinessNoteCodes = {BusinessNoteCodes}, BusinessNoteDesc = {BusinessNoteDesc}, " +
                   $"InformationComponents = [{informationComponents}], PhoneContact = {phoneContact}, Error = {error}";
        }
    }

    /// <summary>
    /// Represents an information component in the Lead Validation International REST API response.
    /// </summary>
    [DataContract]
    public class InformationComponent
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public override string ToString()
        {
            return $"InformationComponent: Name = {Name}, Value = {Value}";
        }
    }

    /// <summary>
    /// Represents phone contact information in the Lead Validation International REST API response.
    /// </summary>
    [DataContract]
    public class PhoneContact
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Type { get; set; }

        public override string ToString()
        {
            return $"PhoneContact: Name = {Name}, Address = {Address}, City = {City}, State = {State}, Zip = {Zip}, Type = {Type}";
        }
    }

    /// <summary>
    /// Represents error information in the Lead Validation International REST API response.
    /// </summary>
    [DataContract]
    public class Error
    {
        public string Type { get; set; }
        public string TypeCode { get; set; }
        public string Desc { get; set; }
        public string DescCode { get; set; }
        public string Number { get; set; }

        public override string ToString()
        {
            return $"Error: Type = {Type}, TypeCode = {TypeCode}, Desc = {Desc}, DescCode = {DescCode}, Number = {Number}";
        }
    }
}