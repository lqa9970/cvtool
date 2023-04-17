import React, { useState } from 'react';
import { Container, Grid, Image, Button, Card, Header, Dropdown, Input, Menu, MenuItemProps } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ninja from "../../assets/ninja.png"
import BasicInfo from "../../components/BasicInfo/basicinfo"

interface ICVForm {
}


const CreateCV = () => {

  return (
    <>
    <BasicInfo/>
    {/* <Button primary style={{ backgroundColor: 'rgb(22,22,50)', color: 'white' }} type="submit" onClick={()=>handleSubmit}>
      Save
    </Button> */}
    </>         
  );
};

export default CreateCV;
