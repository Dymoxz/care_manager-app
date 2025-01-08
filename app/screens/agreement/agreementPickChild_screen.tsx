import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import React from "react";

export default function AgreementPickChildScreen({navigation}) {
    return (
        <TitleLayout
            titleText="Afspraak maken"
            topContent={
                <BackButton navigation={navigation}/>
            }>
            <></>
        </TitleLayout>
    );
}
