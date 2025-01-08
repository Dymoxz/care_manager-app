import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import React from "react";

export default function ShiftScreen( {navigation} ) {
    return (
        <TitleLayout
            titleText="Mijn dienst"
            topContent={
                <BackButton navigation={navigation}/>
            }>
            <></>
        </TitleLayout>
    );
}
