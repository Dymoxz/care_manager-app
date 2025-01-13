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
}

export const useIntakeForm = (initialValues: Partial<IntakeFormState> = {}): UseIntakeFormResult => {
    const [formState, setFormState] = useState<IntakeFormState>({...initialFormState, ...initialValues});

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

    return {
        formState,
        setFieldValue,
        handleGenderSelect,
        handleClinicalProfileSelect,
        handleMedicineSelect,
        handleRoomSelect,
        resetForm,
    };
};