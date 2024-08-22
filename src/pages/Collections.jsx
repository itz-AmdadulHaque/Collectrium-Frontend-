import React from "react";
import {Button} from "flowbite-react"
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate()
  return <section
  className="container">
    <h1>collections</h1>
    <Button color="light" onClick={()=>{
      navigate("/collections/create")
    }}>Create collection</Button>
  </section>;
};

export default Collections;
