import { useState } from "react";

interface MedicalCheck {
    id: string;
    checkName: string;
}

interface MedicalCheckFormState {
    selectedPatients: string;
    bloeddruk: string;
    omschrijving: string;
    hartslag: string;
    patientName: string;
    medicalChecks: MedicalCheck[];
}

interface Errors {
    selectedPatients: string;
    hartslag: number;
    bloeddruk: string;
    omschrijving: string;
    patientName?: string;
    medicalChecks?: string;
}

const initialMedicalCheckFormState: MedicalCheckFormState = {
    patientName: "",
    selectedPatients: "",
    bloeddruk: "",
    omschrijving: "",
    hartslag: "",
    medicalChecks: [],
};

interface UseMedicalCheckFormResult {
    formState: MedicalCheckFormState;
    setFieldValue: <K extends keyof MedicalCheckFormState>(key: K, value: MedicalCheckFormState[K]) => void;
    handleMedicalCheckSelect: (checks: MedicalCheck[]) => void;
    resetForm: () => void;
    errors: Errors;
    // validateField: <K extends keyof MedicalCheckFormState>(key: K, value?: MedicalCheckFormState[K]) => boolean;
    // validateForm: () => boolean;
}

export const useMedCheckForm = (formData: any): UseMedicalCheckFormResult => {
    const [formState, setFormState] = useState<MedicalCheckFormState>(initialMedicalCheckFormState);
    const [errors, setErrors] = useState<Errors>({});

    const setFieldValue = <K extends keyof MedicalCheckFormState>(key: K, value: MedicalCheckFormState[K]) => {
        setFormState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };


    const handleMedicalCheckSelect = (checks: MedicalCheck[]) => {
        setFieldValue("medicalChecks", checks);
    };

    const resetForm = () => {
        setFormState(initialMedicalCheckFormState);
    };

    // const validateField = <K extends keyof MedicalCheckFormState>(key: K, value: MedicalCheckFormState[K] = formState[key]) => {
    //     let error: string | undefined = undefined;
    //
    //     switch (key) {
    //         case "patientName":
    //             if (!value) error = "Naam van de patiënt is verplicht";
    //             break;
    //         case "medicalChecks":
    //             if (!(value as MedicalCheck[]).length) error = "Selecteer minimaal één medische check";
    //             break;
    //     }
    //
    //     setErrors(prevErrors => ({
    //         ...prevErrors,
    //         [key]: error,
    //     }));
    //
    //     return !error;
    // };
    //
    // const validateForm = () => {
    //     let isValid = true;
    //     const fieldsToValidate: (keyof MedicalCheckFormState)[] = ["patientName", "medicalChecks"];
    //
    //     fieldsToValidate.forEach(field => {
    //         if (!validateField(field)) {
    //             isValid = false;
    //         }
    //     });
    //
    //     return isValid;
    // };

    return {
        formState,
        setFieldValue,
        handleMedicalCheckSelect,
        resetForm,
        errors,
        // validateField,
        // validateForm,
    };
};
