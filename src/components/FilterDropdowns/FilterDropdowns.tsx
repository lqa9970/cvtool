import { Container, Divider, Header } from "semantic-ui-react";

import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import { Filters } from "../../types/types";
import CustomReset from "./CustomReset";
import FilterDropdown from "./FilterDropdown";
import "./FilterDropdowns.scss";

type FilterDropdownsProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const initialFilters: Filters = {
  hyperscaler: [],
  mainTech: [],
  skills: [],
  certificate: [],
  location: [],
  languages: [],
  nationality: [],
};

type FirestoreItem = {
  name: string;
};

const useFetchFieldData = (collection: string) => {
  const { data } = useGetFirestoreCollection({ collection });
  return data.map((item) => ({
    key: (item as FirestoreItem).name,
    text: (item as FirestoreItem).name,
    value: (item as FirestoreItem).name,
  }));
};

function FilterDropdowns({ filters, setFilters }: FilterDropdownsProps) {
  const hyperscalerData = useFetchFieldData("hyperscaler");
  const mainTechData = useFetchFieldData("main_tech");
  const skillsData = useFetchFieldData("skills");
  const certificationData = useFetchFieldData("certification");
  const locationData = useFetchFieldData("location");
  const languagesData = useFetchFieldData("languages");
  const nationalityData = useFetchFieldData("countries");

  const filterData = [
    {
      label: "Hyperscaler",
      options: hyperscalerData,
      filterKey: "hyperscaler",
      multiSelected: true,
    },
    {
      label: "Main tech",
      options: mainTechData,
      filterKey: "mainTech",
      multiSelected: false,
    },
    {
      label: "Skills",
      options: skillsData,
      filterKey: "skills",
      multiSelected: true,
    },
    {
      label: "Certificates",
      options: certificationData,
      filterKey: "certificate",
      multiSelected: true,
    },
    {
      label: "Location",
      options: locationData,
      filterKey: "location",
      multiSelected: false,
    },
    {
      label: "Languages",
      options: languagesData,
      filterKey: "languages",
      multiSelected: true,
    },
    {
      label: "Nationality",
      options: nationalityData,
      filterKey: "nationality",
      multiSelected: false,
    },
  ];

  const handleFormReset = () => {
    setFilters(initialFilters);
  };

  return (
    <form>
      <Container>
        <div className="header-wrapper">
          <Header as="h4">Filter</Header>
          <CustomReset label="Clear Selection" onClick={handleFormReset} />
        </div>
        <Divider />
        {filterData.map((filter, index) => (
          <FilterDropdown
            key={index}
            multiSelected={filter.multiSelected}
            label={filter.label}
            options={filter.options}
            filterKey={filter.filterKey as keyof Filters}
            filters={filters}
            setFilters={setFilters}
          />
        ))}
      </Container>
    </form>
  );
}

export default FilterDropdowns;
