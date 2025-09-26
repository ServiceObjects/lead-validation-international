export class InformationComponent {
    constructor(data = {}) {
        this.Name = data.Name;
        this.Value = data.Value;
    }

    toString() {
        return `InformationComponent: Name = ${this.Name}, Value = ${this.Value}`;
    }
}

export class PhoneContact {
    constructor(data = {}) {
        this.Name = data.Name;
        this.Address = data.Address;
        this.City = data.City;
        this.State = data.State;
        this.Zip = data.Zip;
        this.Type = data.Type;
    }

    toString() {
        return `PhoneContact: Name = ${this.Name}, Address = ${this.Address}, City = ${this.City}, State = ${this.State}, Zip = ${this.Zip}, Type = ${this.Type}`;
    }
}

export class ErrorModel {
    constructor(data = {}) {
        this.Type = data.Type;
        this.TypeCode = data.TypeCode;
        this.Desc = data.Desc;
        this.DescCode = data.DescCode;
        this.Number = data.Number;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}`;
    }
}

export class LVIResponse {
    constructor(data = {}) {
        this.OverallCertainty = data.OverallCertainty;
        this.OverallQuality = data.OverallQuality;
        this.LeadType = data.LeadType;
        this.LeadCountry = data.LeadCountry;
        this.NoteCodes = data.NoteCodes;
        this.NoteDesc = data.NoteDesc;
        this.NameCertainty = data.NameCertainty;
        this.NameQuality = data.NameQuality;
        this.FirstNameLatin = data.FirstNameLatin;
        this.LastNameLatin = data.LastNameLatin;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.NameNoteCodes = data.NameNoteCodes;
        this.NameNoteDesc = data.NameNoteDesc;
        this.AddressCertainty = data.AddressCertainty;
        this.AddressQuality = data.AddressQuality;
        this.AddressResolutionLevel = data.AddressResolutionLevel;
        this.AddressLine1 = data.AddressLine1;
        this.AddressLine2 = data.AddressLine2;
        this.AddressLine3 = data.AddressLine3;
        this.AddressLine4 = data.AddressLine4;
        this.AddressLine5 = data.AddressLine5;
        this.AddressLocality = data.AddressLocality;
        this.AddressAdminArea = data.AddressAdminArea;
        this.AddressPostalCode = data.AddressPostalCode;
        this.AddressCountry = data.AddressCountry;
        this.AddressNoteCodes = data.AddressNoteCodes;
        this.AddressNoteDesc = data.AddressNoteDesc;
        this.EmailCertainty = data.EmailCertainty;
        this.EmailQuality = data.EmailQuality;
        this.EmailCorrected = data.EmailCorrected;
        this.EmailNoteCodes = data.EmailNoteCodes;
        this.EmailNoteDesc = data.EmailNoteDesc;
        this.IPCertainty = data.IPCertainty;
        this.IPQuality = data.IPQuality;
        this.IPLocality = data.IPLocality;
        this.IPAdminArea = data.IPAdminArea;
        this.IPCountry = data.IPCountry;
        this.IPNoteCodes = data.IPNoteCodes;
        this.IPNoteDesc = data.IPNoteDesc;
        this.Phone1Certainty = data.Phone1Certainty;
        this.Phone1Quality = data.Phone1Quality;
        this.Phone1Locality = data.Phone1Locality;
        this.Phone1AdminArea = data.Phone1AdminArea;
        this.Phone1Country = data.Phone1Country;
        this.Phone1NoteCodes = data.Phone1NoteCodes;
        this.Phone1NoteDesc = data.Phone1NoteDesc;
        this.Phone2Certainty = data.Phone2Certainty;
        this.Phone2Quality = data.Phone2Quality;
        this.Phone2Locality = data.Phone2Locality;
        this.Phone2AdminArea = data.Phone2AdminArea;
        this.Phone2Country = data.Phone2Country;
        this.Phone2NoteCodes = data.Phone2NoteCodes;
        this.Phone2NoteDesc = data.Phone2NoteDesc;
        this.BusinessCertainty = data.BusinessCertainty;
        this.BusinessQuality = data.BusinessQuality;
        this.BusinessName = data.BusinessName;
        this.BusinessDomain = data.BusinessDomain;
        this.BusinessEmail = data.BusinessEmail;
        this.BusinessNoteCodes = data.BusinessNoteCodes;
        this.BusinessNoteDesc = data.BusinessNoteDesc;
        this.InformationComponents = (data.InformationComponents || []).map(ic => new InformationComponent(ic));
        this.PhoneContact = data.PhoneContact ? new PhoneContact(data.PhoneContact) : null;
        this.Error = data.Error ? new ErrorModel(data.Error) : null;
    }

    toString() {
        const infoComponents = this.InformationComponents.length
            ? this.InformationComponents.map(ic => ic.toString()).join(', ')
            : 'None';

        const phoneContact = this.PhoneContact ? this.PhoneContact.toString() : 'None';
        const error = this.Error ? this.Error.toString() : 'None';

        return `LVI Response: OverallCertainty = ${this.OverallCertainty}, OverallQuality = ${this.OverallQuality}, ` +
            `LeadType = ${this.LeadType}, LeadCountry = ${this.LeadCountry}, NoteCodes = ${this.NoteCodes}, NoteDesc = ${this.NoteDesc}, ` +
            `NameCertainty = ${this.NameCertainty}, NameQuality = ${this.NameQuality}, FirstNameLatin = ${this.FirstNameLatin}, ` +
            `LastNameLatin = ${this.LastNameLatin}, FirstName = ${this.FirstName}, LastName = ${this.LastName}, ` +
            `NameNoteCodes = ${this.NameNoteCodes}, NameNoteDesc = ${this.NameNoteDesc}, AddressCertainty = ${this.AddressCertainty}, ` +
            `AddressQuality = ${this.AddressQuality}, AddressResolutionLevel = ${this.AddressResolutionLevel}, ` +
            `AddressLine1 = ${this.AddressLine1}, AddressLine2 = ${this.AddressLine2}, AddressLine3 = ${this.AddressLine3}, ` +
            `AddressLine4 = ${this.AddressLine4}, AddressLine5 = ${this.AddressLine5}, AddressLocality = ${this.AddressLocality}, ` +
            `AddressAdminArea = ${this.AddressAdminArea}, AddressPostalCode = ${this.AddressPostalCode}, AddressCountry = ${this.AddressCountry}, ` +
            `AddressNoteCodes = ${this.AddressNoteCodes}, AddressNoteDesc = ${this.AddressNoteDesc}, EmailCertainty = ${this.EmailCertainty}, ` +
            `EmailQuality = ${this.EmailQuality}, EmailCorrected = ${this.EmailCorrected}, EmailNoteCodes = ${this.EmailNoteCodes}, ` +
            `EmailNoteDesc = ${this.EmailNoteDesc}, IPCertainty = ${this.IPCertainty}, IPQuality = ${this.IPQuality}, ` +
            `IPLocality = ${this.IPLocality}, IPAdminArea = ${this.IPAdminArea}, IPCountry = ${this.IPCountry}, IPNoteCodes = ${this.IPNoteCodes}, ` +
            `IPNoteDesc = ${this.IPNoteDesc}, Phone1Certainty = ${this.Phone1Certainty}, Phone1Quality = ${this.Phone1Quality}, ` +
            `Phone1Locality = ${this.Phone1Locality}, Phone1AdminArea = ${this.Phone1AdminArea}, Phone1Country = ${this.Phone1Country}, ` +
            `Phone1NoteCodes = ${this.Phone1NoteCodes}, Phone1NoteDesc = ${this.Phone1NoteDesc}, Phone2Certainty = ${this.Phone2Certainty}, ` +
            `Phone2Quality = ${this.Phone2Quality}, Phone2Locality = ${this.Phone2Locality}, Phone2AdminArea = ${this.Phone2AdminArea}, ` +
            `Phone2Country = ${this.Phone2Country}, Phone2NoteCodes = ${this.Phone2NoteCodes}, Phone2NoteDesc = ${this.Phone2NoteDesc}, ` +
            `BusinessCertainty = ${this.BusinessCertainty}, BusinessQuality = ${this.BusinessQuality}, BusinessName = ${this.BusinessName}, ` +
            `BusinessDomain = ${this.BusinessDomain}, BusinessEmail = ${this.BusinessEmail}, BusinessNoteCodes = ${this.BusinessNoteCodes}, ` +
            `BusinessNoteDesc = ${this.BusinessNoteDesc}, InformationComponents = [${infoComponents}], PhoneContact = ${phoneContact}, Error = ${error}`;
    }
}

export default LVIResponse