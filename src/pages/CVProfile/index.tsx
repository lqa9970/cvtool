import React, { useState } from 'react';
import { Container, Grid, Image, Button, Card, Header, Dropdown, Input, Menu, MenuItemProps } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ninja from "../../assets/ninja.png"


interface FormValues {
  social: string[];
}

interface SocialMedia {
    key: string;
    value: string;
    text: string;
    domain: string;
  }
  
const socialMediaOptions: SocialMedia[] = [
    { key: 'Github', value: 'github', text: 'Github', domain: 'github.com' },
    { key: 'linkedin', value: 'linkedin', text: 'LinkedIn', domain: 'linkedin.com' },
];

const validationSchema = Yup.object().shape({
  social: Yup.array().of(Yup.string()).min(1, 'At least one social link is required'),
});

const CreateCV = () => {
  const initialValues: FormValues = {
    social: [],
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const [selectedSocialMedia, setSelectedSocialMedia] = useState<SocialMedia | null>(null);

  const handleSocialMediaChange = (event: React.SyntheticEvent<HTMLElement>, data: any) => {
        setSelectedSocialMedia(data.value as SocialMedia);
  };

  const [activeItem, setActiveItem] = useState<string>("basic-info");

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { name }: { name: string }
  ) => setActiveItem(name);


  return (
    <Container className="dashboard">
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Card>
                <Image src={ninja} size='small' wrapped ui={false} />
                <Card.Content extra>
                    <Button disabled style={{backgroundColor: 'rgb(22,22,50)', color: 'white' }}>
                        Change Avatar
                    </Button>
                </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={10}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form>
                  <div className="field">
                    <Header as='h3' dividing>
                        Basic Info
                    </Header>
                    <Header size="large">Md Towfiqul Alom</Header>
                    <Header size='small'>Software Developer</Header>

                    <Header.Subheader>
                        <i className="envelope icon"></i>
                        towfiqul.alom@nordcloud.com
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="address card icon"></i>
                        Helsinki, Finland
                    </Header.Subheader>
                    <Header.Subheader>
                        <i className="phone square icon"></i>
                        +3580318154107
                    </Header.Subheader>

                    <Header as='h3' dividing>
                        Social Links
                    </Header>
                    <Grid columns={2}>
                    <Grid.Column width={4}>
                        <Dropdown
                            placeholder="Social Platform"
                            fluid
                            selection
                            options={socialMediaOptions}
                            onChange={handleSocialMediaChange}
                        />
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Input
                        label={selectedSocialMedia?.domain?`${selectedSocialMedia?.domain}/`: 'link'}
                        placeholder="Link"
                        disabled={!selectedSocialMedia}
                    />
                    </Grid.Column>
                    </Grid>

                  </div>
                  
                    <br />
                    <br />
                  <Button primary style={{ backgroundColor: 'rgb(22,22,50)', color: 'white' }} type="submit" onClick={()=>handleSubmit}>
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className="ui grid container">
      <div className="sixteen wide column">
        <div className="ui">
          <div className="ui stackable grid">
            <div className="thirteen wide column">
              <div id="basic-info">
                {/* Content for Basic Info section goes here */}
              </div>
              <div id="skills">
                {/* Content for Skills section goes here */}
              </div>
              <div id="certificates">
                {/* Content for Certificates section goes here */}
              </div>
            </div>
            <div className="three wide column">
              <Menu fluid vertical>
                <Menu.Item
                  name="basic-info"
                  active={activeItem === "basic-info"}
                  onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps
                  ) => handleItemClick(e, { name: data.name! })}
                >
                
                  Basic Info
                </Menu.Item>
                <Menu.Item
                  name="skills"
                  active={activeItem === "skills"}
                  onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps
                  ) => handleItemClick(e, { name: data.name! })}
                >
                
                  Skills
                </Menu.Item>
                <Menu.Item
                  name="certificates"
                  active={activeItem === "certificates"}
                  onClick={(
                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps
                  ) => handleItemClick(e, { name: data.name! })}
                >
                
                  Certificates
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default CreateCV;
