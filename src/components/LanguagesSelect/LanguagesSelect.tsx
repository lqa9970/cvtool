import { Button, Dropdown, DropdownProps } from 'semantic-ui-react';
import { useFormik } from 'formik';
import useGetLanguages from '../../hooks/useGetLanguages';
import LanguageProfiencies from './LanguageProficiencies/LanguageProficiencies';
import LanguageCards from './LanguageCards/LanguageCards';
import { FC, useEffect, useState } from 'react';
import { LanguagesWithProficiency } from '../../types/types';
import './LanguageSelect.scss';
import useUpdateUser from '../../hooks/useUpdateUser';
export interface FormValues {
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

  const options = languages.map((language) => ({
    key: language.id,
    value: language.name,
    text: language.name
  }));

  const formik = useFormik<FormValues>({
    initialValues: {
      language: '',
      proficiency: ''
    },
    onSubmit: (values) => {
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
    const newState = languagesWithProficiencies.filter((_, i) => i !== index);
    setLanguagesWithProficiencies(newState);

    updateUser({ languages: newState }, props.userId);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Dropdown
        name="language"
        placeholder="Select a language"
        search
        selection
        options={options}
        onChange={handleDropdownChange}
      />
      <div className="container">
        <LanguageProfiencies
          handleProficiencyChange={handleProficiencyChange}
        ></LanguageProfiencies>

        <Button
          size="small"
          disabled={!formik.values.language && !formik.values.proficiency}
          type="submit"
        >
          Add
        </Button>
      </div>
      <LanguageCards
        languages={languagesWithProficiencies}
        onClickHandler={handleCardDelete}
      />
    </form>
  );
};
export default LanguagesSelect;
