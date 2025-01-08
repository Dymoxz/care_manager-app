import TitleLayout from "../common/title_layout";
import BackButton from "../common/back_button";
import React from "react";

export default function MedcheckPickChildScreen( {navigation} ) {
  return (
      <TitleLayout
          titleText="Medische check"
          topContent={
              <BackButton navigation={navigation}/>
          }>
          <></>
      </TitleLayout>
      );
}
