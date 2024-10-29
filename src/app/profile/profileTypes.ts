export interface PersonalInfo {
    firstName: string;
    lastName: string;
    phone: string;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  }
  
  export interface ProfileViewProps {
    personalInfo: PersonalInfo;
    address: Address;
    loading: boolean;
    isEditingPersonalInfo: boolean;
    isEditingAddress: boolean;
    setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    handleSavePersonalInfo: () => Promise<void>;
    handleSaveAddress: () => Promise<void>;
    setIsEditingPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  }