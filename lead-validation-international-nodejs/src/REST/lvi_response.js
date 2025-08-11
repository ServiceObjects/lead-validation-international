export class InformationComponent {
    constructor(data = {}) {
        this.Name = data.Name || null;
        this.Value = data.Value || null;
    }

    toString() {
        return `InformationComponent: Name = ${this.Name}, Value = ${this.Value}`;
    }
}

export class PhoneContact {
    constructor(data = {}) {
        this.Name = data.Name || null;
        this.Address = data.Address || null;
        this.City = data.City || null;
        this.State = data.State || null;
        this.Zip = data.Zip || null;
        this.Type = data.Type || null;
    }

    toString() {
        return `PhoneContact: Name = ${this.Name}, Address = ${this.Address}, City = ${this.City}, State = ${this.State}, Zip = ${this.Zip}, Type = ${this.Type}`;
    }
}

export class ErrorModel {
    constructor(data = {}) {
        this.Type = data.Type || null;
        this.TypeCode = data.TypeCode || null;
        this.Desc = data.Desc || null;
        this.DescCode = data.DescCode || null;
        this.Number = data.Number || null;
    }

    toString() {
        return `Error: Type = ${this.Type}, TypeCode = ${this.TypeCode}, Desc = ${this.Desc}, DescCode = ${this.DescCode}, Number = ${this.Number}`;
    }
}

export class LVIResponse {
    constructor(data = {}) {
        this.OverallCertainty = data.OverallCertainty || null;
        this.OverallQuality = data.OverallQuality || null;
        this.LeadType = data.LeadType || null;
        this.LeadCountry = data.LeadCountry || null;
        this.NoteCodes = data.NoteCodes || null;
        this.NoteDesc = data.NoteDesc || null;
        this.NameCertainty = data.NameCertainty || null;
        this.NameQuality = data.NameQuality || null;
        this.FirstNameLatin = data.FirstNameLatin || null;
        this.LastNameLatin = data.LastNameLatin || null;
        this.FirstName = data.FirstName || null;
        this.LastName = data.LastName || null;
        this.NameNoteCodes = data.NameNoteCodes || null;
        this.NameNoteDesc = data.NameNoteDesc || null;
        this.AddressCertainty = data.AddressCertainty || null;
        this.AddressQuality = data.AddressQuality || null;
        this.AddressResolutionLevel = data.AddressResolutionLevel || null;
        this.AddressLine1 = data.AddressLine1 || null;
        this.AddressLine2 = data.AddressLine2 || null;
        this.AddressLine3 = data.AddressLine3 || null;
        this.AddressLine4 = data.AddressLine4 || null;
        this.AddressLine5 = data.AddressLine5 || null;
        this.AddressLocality = data.AddressLocality || null;
        this.AddressAdminArea = data.AddressAdminArea || null;
        this.AddressPostalCode = data.AddressPostalCode || null;
        this.AddressCountry = data.AddressCountry || null;
        this.AddressNoteCodes = data.AddressNoteCodes || null;
        this.AddressNoteDesc = data.AddressNoteDesc || null;
        this.EmailCertainty = data.EmailCertainty || null;
        this.EmailQuality = data.EmailQuality || null;
        this.EmailCorrected = data.EmailCorrected || null;
        this.EmailNoteCodes = data.EmailNoteCodes || null;
        this.EmailNoteDesc = data.EmailNoteDesc || null;
        this.IPCertainty = data.IPCertainty || null;
        this.IPQuality = data.IPQuality || null;
        this.IPLocality = data.IPLocality || null;
        this.IPAdminArea = data.IPAdminArea || null;
        this.IPCountry = data.IPCountry || null;
        this.IPNoteCodes = data.IPNoteCodes || null;
        this.IPNoteDesc = data.IPNoteDesc || null;
        this.Phone1Certainty = data.Phone1Certainty || null;
        this.Phone1Quality = data.Phone1Quality || null;
        this.Phone1Locality = data.Phone1Locality || null;
        this.Phone1AdminArea = data.Phone1AdminArea || null;
        this.Phone1Country = data.Phone1Country || null;
        this.Phone1NoteCodes = data.Phone1NoteCodes || null;
        this.Phone1NoteDesc = data.Phone1NoteDesc || null;
        this.Phone2Certainty = data.Phone2Certainty || null;
        this.Phone2Quality = data.Phone2Quality || null;
        this.Phone2Locality = data.Phone2Locality || null;
        this.Phone2AdminArea = data.Phone2AdminArea || null;
        this.Phone2Country = data.Phone2Country || null;
        this.Phone2NoteCodes = data.Phone2NoteCodes || null;
        this.Phone2NoteDesc = data.Phone2NoteDesc || null;
        this.BusinessCertainty = data.BusinessCertainty || null;
        this.BusinessQuality = data.BusinessQuality || null;
        this.BusinessName = data.BusinessName || null;
        this.BusinessDomain = data.BusinessDomain || null;
        this.BusinessEmail = data.BusinessEmail || null;
        this.BusinessNoteCodes = data.BusinessNoteCodes || null;
        this.BusinessNoteDesc = data.BusinessNoteDesc || null;
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