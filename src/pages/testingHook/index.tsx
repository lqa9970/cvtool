import React from 'react';
import  useFirestoreFilter  from '../../hooks/useFilter';


const FilterPage = () => {
  const { data, setFilter } = useFirestoreFilter();

  // Apply filters based on button click
  const handleFilter = (filterType : any, filterValue : any) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [filterType]: [...prevFilter[filterType], filterValue] ,
    }));
  };
  console.log(data)

  return (
    <div>
      <h1>Filter Page</h1>

      {/* <button onClick={() => handleFilter('skills', 'python')}>Filter by Python Skill</button> */}
      <button onClick={() => handleFilter('skills', 'java')}>Filter by Java Skill</button>
      {/* <button onClick={() => handleFilter('languages', 'Finnish')}>Filter by Finnish Language</button>
      <button onClick={() => handleFilter('languages', 'English')}>Filter by English Language</button>
      <button onClick={() => handleFilter('nationality', 'Finland')}>Filter by Finland Nationality</button>
      <button onClick={() => handleFilter('location', 'Helsinki')}>Filter by Helsinki Location</button> */}

      <h2>Filtered Data:</h2>
      <ul>
        {data.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Location: {user.location}</p>
            {/* Display other fields as necessary */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPage;
