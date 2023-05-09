import {React, useState} from "react";

const ResMaps = ({locations}) => {

  const Subway  = "Subway"
   const url = `https://lookerstudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${locations}"}`;
  const map = <ul>
      <iframe
          title="My report"
          src = {url}
          width="100%"
          height="600px"
        ></iframe>
    </ul>  
  return (
      <>
        {map}
      </>
    )
}

export default ResMaps;