from dataclasses import dataclass
from typing import Optional, List

@dataclass
class LVIResponse:
    OverallCertainty: Optional[str] = None
    OverallQuality: Optional[str] = None
    LeadType: Optional[str] = None
    LeadCountry: Optional[str] = None
    NoteCodes: Optional[str] = None
    NoteDesc: Optional[str] = None
    NameCertainty: Optional[str] = None
    NameQuality: Optional[str] = None
    FirstNameLatin: Optional[str] = None
    LastNameLatin: Optional[str] = None
    FirstName: Optional[str] = None
    LastName: Optional[str] = None
    NameNoteCodes: Optional[str] = None
    NameNoteDesc: Optional[str] = None
    AddressCertainty: Optional[str] = None
    AddressQuality: Optional[str] = None
    AddressResolutionLevel: Optional[str] = None
    AddressLine1: Optional[str] = None
    AddressLine2: Optional[str] = None
    AddressLine3: Optional[str] = None
    AddressLine4: Optional[str] = None
    AddressLine5: Optional[str] = None
    AddressLocality: Optional[str] = None
    AddressAdminArea: Optional[str] = None
    AddressPostalCode: Optional[str] = None
    AddressCountry: Optional[str] = None
    AddressNoteCodes: Optional[str] = None
    AddressNoteDesc: Optional[str] = None
    EmailCertainty: Optional[str] = None
    EmailQuality: Optional[str] = None
    EmailCorrected: Optional[str] = None
    EmailNoteCodes: Optional[str] = None
    EmailNoteDesc: Optional[str] = None
    IPCertainty: Optional[str] = None
    IPQuality: Optional[str] = None
    IPLocality: Optional[str] = None
    IPAdminArea: Optional[str] = None
    IPCountry: Optional[str] = None
    IPNoteCodes: Optional[str] = None
    IPNoteDesc: Optional[str] = None
    Phone1Certainty: Optional[str] = None
    Phone1Quality: Optional[str] = None
    Phone1Locality: Optional[str] = None
    Phone1AdminArea: Optional[str] = None
    Phone1Country: Optional[str] = None
    Phone1NoteCodes: Optional[str] = None
    Phone1NoteDesc: Optional[str] = None
    Phone2Certainty: Optional[str] = None
    Phone2Quality: Optional[str] = None
    Phone2Locality: Optional[str] = None
    Phone2AdminArea: Optional[str] = None
    Phone2Country: Optional[str] = None
    Phone2NoteCodes: Optional[str] = None
    Phone2NoteDesc: Optional[str] = None
    BusinessCertainty: Optional[str] = None
    BusinessQuality: Optional[str] = None
    BusinessName: Optional[str] = None
    BusinessDomain: Optional[str] = None
    BusinessEmail: Optional[str] = None
    BusinessNoteCodes: Optional[str] = None
    BusinessNoteDesc: Optional[str] = None
    InformationComponents: Optional[List['InformationComponent']] = None
    PhoneContact: Optional['PhoneContact'] = None
    Error: Optional['Error'] = None

    def __str__(self) -> str:
        info = ", ".join(str(c) for c in self.InformationComponents) if self.InformationComponents else "None"
        contact = str(self.PhoneContact) if self.PhoneContact else "None"
        error = str(self.Error) if self.Error else "None"
        return (f"LVIResponse: OverallCertainty={self.OverallCertainty}, OverallQuality={self.OverallQuality}, "
                f"LeadType={self.LeadType}, LeadCountry={self.LeadCountry}, NoteCodes={self.NoteCodes}, "
                f"NoteDesc={self.NoteDesc}, FirstName={self.FirstName}, LastName={self.LastName}, "
                f"BusinessName={self.BusinessName}, EmailCorrected={self.EmailCorrected}, "
                f"PhoneContact={contact}, Error={error}, InformationComponents=[{info}]")

@dataclass
class InformationComponent:
    Name: Optional[str] = None
    Value: Optional[str] = None

    def __str__(self) -> str:
        return f"InformationComponent: Name={self.Name}, Value={self.Value}"

@dataclass
class PhoneContact:
    Name: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    State: Optional[str] = None
    Zip: Optional[str] = None
    Type: Optional[str] = None

    def __str__(self) -> str:
        return (f"PhoneContact: Name={self.Name}, Address={self.Address}, City={self.City}, "
                f"State={self.State}, Zip={self.Zip}, Type={self.Type}")

@dataclass
class Error:
    Type: Optional[str] = None
    TypeCode: Optional[str] = None
    Desc: Optional[str] = None
    DescCode: Optional[str] = None
    Number: Optional[str] = None

    def __str__(self) -> str:
        return (f"Error: Type={self.Type}, TypeCode={self.TypeCode}, Desc={self.Desc}, "
                f"DescCode={self.DescCode}, Number={self.Number}")
