import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Dropdown, DropdownProps, Grid } from 'semantic-ui-react';
import useGetLanguages from '../../hooks/useGetLanguages';
import { LanguagesWithProficiency } from '../../types/types';
import LanguageCards from './LanguageCards/LanguageCards';
import LanguageProfiencies from './LanguageProficiencies/LanguageProficiencies';
import './LanguageSelect.scss';
import useUpdateUser from '../../hooks/useUpdateUser';

export type FormValues = {
  language: string;
  proficiency: string;
}

export type LanguageSelectProps = {
  profileLanguages: LanguagesWithProficiency[] | undefined;
  userId: string;
};

const LanguagesSelect: FC<LanguageSelectProps> = (props) => {
  const [languagesWithProficiencies, setLanguagesWithProficiencies] = useState<
    LanguagesWithProficiency[]
  >([]);
  const [updateUser] = useUpdateUser();

  useEffect(() => {
    if (props.profileLanguages) {
      setLanguagesWithProficiencies(props.profileLanguages);
    }
  }, []);

  const languages = useGetLanguages();

  const options = languages
    .map((language) => ({
      key: language.id,
      value: language.name,
      text: language.name
    }))
    .filter((language) => {
      // Filter selected languages
      return !languagesWithProficiencies.some((index) => index.name === language.value);
    });

  const formik = useFormik<FormValues>({
    initialValues: {
      language: '',
      proficiency: ''
    },
    onSubmit: (values) => {
      formik.resetForm();

      setLanguagesWithProficiencies([
        { name: values.language, proficiency: values.proficiency },
        ...languagesWithProficiencies
      ]);

      updateUser(
        {
          languages: [
            { name: values.language, proficiency: values.proficiency },
            ...languagesWithProficiencies
          ]
        },
        props.userId
      );
    }
  });

  const handleDropdownChange = (
    event: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps
  ) => {
    formik.setFieldValue('language', value);
  };

  const handleProficiencyChange = (value: string) => {
    formik.setFieldValue('proficiency', value);
  };

  const handleCardDelete = (index: number) => {
    const newState = languagesWithProficiencies.filter((_, index_) => index_ !== index);
    setLanguagesWithProficiencies(newState);

    updateUser({ languages: newState }, props.userId);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              search
              selection
              name="language"
              placeholder="Select a language"
              options={options}
              onChange={handleDropdownChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="middle" columns={2}>
          <Grid.Column width={12}>
            <LanguageProfiencies
              proficiency={formik.values.proficiency}
              handleProficiencyChange={handleProficiencyChange}
             />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button
              id="language-add-button"
              disabled={!formik.values.language || !formik.values.proficiency}
              type="submit"
            >
              Add
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <LanguageCards
              languages={languagesWithProficiencies}
              onClickHandler={handleCardDelete}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </form>
  );
};
export default LanguagesSelect;
