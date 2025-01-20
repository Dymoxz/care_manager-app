import {useState} from "react";

interface Agreement {
    id: string;
    title: string;
}

interface AgreementFormState {
    selectedPatient: string | null;
    omschrijving: string;
    actie: string;
}

interface Errors {
    selectedPatient: string;
    omschrijving: string;
    actie: string;
    patientName?: string;
}

const initialAgreementFormState: AgreementFormState = {
    selectedPatient: null,
    omschrijving: "",
    actie: ""
};

interface UseAgreementFormResult {
    formState: AgreementFormState;
    setFieldValue: <K extends keyof AgreementFormState>(key: K, value: AgreementFormState[K]) => void;
    handleAgreementSelect: (checks: Agreement[]) => void;
    resetForm: () => void;
    errors: Errors;
    validateField: <K extends keyof AgreementFormState>(key: K, value?: AgreementFormState[K]) => boolean;
    validateForm: (page: string) => boolean;
}

export const useAgreementForm = (formData: any): UseAgreementFormResult => {
    const [formState, setFormState] = useState<AgreementFormState>(formData || initialAgreementFormState);
    const [errors, setErrors] = useState<Errors>({});

    const setFieldValue = <K extends keyof AgreementFormState>(key: K, value: AgreementFormState[K]) => {
        setFormState(prevState => ({
            ...prevState,
            [key]: value,
        }));
        setErrors(prevErrors => {
            if (prevErrors[key]) {
                const {[key]: removed, ...rest} = prevErrors;
                return rest;
            }
            return prevErrors;
        });
    };


    const handleAgreementSelect = (checks: Agreement[]) => {
        setFieldValue("agreements", checks);
    };

    const resetForm = () => {
        setFormState(initialAgreementFormState);
    };

    const validateField = <K extends keyof AgreementFormState>(key: K, value: AgreementFormState[K] = formState[key]) => {
        let error: string | undefined = undefined;

        switch (key) {
            case "selectedPatient":
                if (!value) error = "Kies alstublieft een patient";
                break;
            case "omschrijving":
                if(!value) error = "Omschrijving is verplicht";
                break;
            case "actie":
                if (!value) error = "Actie is verplicht";
                break;

        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [key]: error,
        }));

        return !error;
    };

    const validateForm = (page: string) => {
        let isValid = true;
        if(page === 'page1'){
            const fieldsToValidate: (keyof AgreementFormState)[] = ["selectedPatient", 'omschrijving', "actie"];
            fieldsToValidate.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
        } else {
            const fieldsToValidate: (keyof AgreementFormState)[] = ["actie"];
            fieldsToValidate.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
        }
        return isValid;
    };



    return {
        formState,
        setFieldValue,
        handleAgreementSelect,
        resetForm,
        errors,
        validateField,
        validateForm,
    };
};