import {useState} from "react";

interface Gender {
    id: string;
    name: string;
}

interface Medicine {
    atcCode: string;
    name: string;
}

interface ClinicalProfile {
    id: string;
    clinicalProfile: string;
}

interface Room {
    id: string;
    roomNumber: string;
    floor: string;
}

interface IntakeFormState {
    voornaam: string;
    achternaam: string;
    lengte: string;
    gewicht: string;
    selectedGender: Gender | null;
    geboortedatumRaw: string;
    bsn: string;
    selectedClinicalProfiles: ClinicalProfile[];
    foodAllergies: string;
    selectedMedicines: Medicine[];
    selectedRooms: Room[];
}

interface Errors {
    voornaam?: string;
    achternaam?: string;
    lengte?: string;
    gewicht?: string;
    selectedGender?: string;
    geboortedatumRaw?: string;
    bsn?: string;
    selectedClinicalProfiles?: string;
    selectedRooms?: string;
}

const initialFormState: IntakeFormState = {
    voornaam: "",
    achternaam: "",
    lengte: "",
    gewicht: "",
    selectedGender: null,
    geboortedatumRaw: "",
    bsn: "",
    selectedClinicalProfiles: [],
    foodAllergies: "",
    selectedMedicines: [],
    selectedRooms: [],
};

interface UseIntakeFormResult {
    formState: IntakeFormState;
    setFieldValue: <K extends keyof IntakeFormState>(key: K, value: IntakeFormState[K]) => void;
    handleGenderSelect: (gender: Gender | null) => void;
    handleClinicalProfileSelect: (profiles: ClinicalProfile[]) => void;
    handleMedicineSelect: (medicines: Medicine[]) => void;
    handleRoomSelect: (rooms: Room[]) => void;
    resetForm: () => void;
    errors: Errors;
    validateField: <K extends keyof IntakeFormState>(key: K, value?: IntakeFormState[K]) => boolean;
    validateForm: (page: 'page1' | 'page2') => boolean;
}

export const useIntakeForm = (initialValues: Partial<IntakeFormState> = {}): UseIntakeFormResult => {
    const [formState, setFormState] = useState<IntakeFormState>({...initialFormState, ...initialValues});
    const [errors, setErrors] = useState<Errors>({});

    const setFieldValue = <K extends keyof IntakeFormState>(key: K, value: IntakeFormState[K]) => {
        setFormState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleGenderSelect = (gender: Gender | null) => {
        setFieldValue('selectedGender', gender);
    };

    const handleClinicalProfileSelect = (profiles: ClinicalProfile[]) => {
        setFieldValue('selectedClinicalProfiles', profiles);
    };

    const handleMedicineSelect = (medicines: Medicine[]) => {
        setFieldValue('selectedMedicines', medicines);
    };

    const handleRoomSelect = (rooms: Room[]) => {
        setFieldValue('selectedRooms', rooms);
    };

    const resetForm = () => {
        setFormState(initialFormState);
    };

    const validateField = <K extends keyof IntakeFormState>(key: K, value: IntakeFormState[K] = formState[key]) => {
        let error = undefined;

        switch (key) {
            case 'voornaam':
                if (!value) error = 'Voornaam is verplicht';
                break;
            case 'achternaam':
                if (!value) error = 'Achternaam is verplicht';
                break;
            case 'lengte':
                if (!value) error = 'Lengte is verplicht';
                else if (!/^\d+$/.test(value as string)) error = 'Lengte moet een getal zijn';
                break;
            case 'gewicht':
                if (!value) error = 'Gewicht is verplicht';
                else if (!/^\d+(\.\d+)?$/.test(value as string)) error = 'Gewicht moet een getal zijn';
                break;
            case 'selectedGender':
                if (!value) error = 'Geslacht is verplicht';
                break;
            case 'geboortedatumRaw':
                if (!value) error = 'Geboortedatum is verplicht';
                else if (!/^\d{2}-\d{2}-\d{4}$/.test(value as string)) error = 'Ongeldige datum (dd-mm-jjjj)';
                break;
            case 'bsn':
                if (value && !/^\d{9}$/.test(value as string)) error = 'BSN moet 9 cijfers bevatten';
                break;
            case 'selectedClinicalProfiles':
                if (!(value as ClinicalProfile[]).length) error = 'Selecteer minimaal één ziektebeeld';
                break;
            case 'selectedRooms':
                if (!(value as Room[]).length) error = 'Selecteer een kamer';
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [key]: error,
        }));

        return !error;
    };

    const validateForm = (page: 'page1' | 'page2') => {
        let isValid = true;
        const fieldsToValidate: (keyof IntakeFormState)[] = page === 'page1'
            ? ['voornaam', 'achternaam', 'lengte', 'gewicht', 'selectedGender', 'geboortedatumRaw', 'bsn']
            : ['selectedClinicalProfiles', 'selectedRooms']; // 'selectedMedicines', 'foodAllergies' are optional

        fieldsToValidate.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    };

    return {
        formState,
        setFieldValue,
        handleGenderSelect,
        handleClinicalProfileSelect,
        handleMedicineSelect,
        handleRoomSelect,
        resetForm,
        errors,
        validateField,
        validateForm,
    };
};