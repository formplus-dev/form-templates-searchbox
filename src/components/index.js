import { useState, useEffect } from "react";
import { useFetch } from "../fetch-templates-hook/TemplatesHook";
import FilterBox from "./search-filter/index";
import CardContainer from "./card-container/index";
import "./_templates.scss";
import Banner from "./banner";
import Pagination from "./pagination";

// const templates = [
//   {
//     category: ["Health", "E-commerce", "Education"],
//     created: "2020-11-07T18:58:21.516176",
//     description: "irure aliqua. Excepteur exercitation consequat.",
//     link: "https://formpl.us/templates",
//     name: "exercitation elit, magna",
//   },

//   {
//     category: ["Health", "E-commerce", "Education"],
//     created: "2020-11-07T18:58:21.517950",
//     description: "irure mollit aliquip pariatur. exercitation",
//     link: "https://formpl.us/templates",
//     name: "voluptate fugiat deserunt",
//   },
// ];
const TemplatesWrapper = () => {
  const url =
    "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates";

  const { status, templates } = useFetch(url);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [cardsPerPage] = useState(18);
  const indexOfLastCard = currentPage * cardsPerPage;

  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  useEffect(() => {
    setFilteredTemplates(templates);
  }, [templates]);

  const [filterOptions, setFilterOptions] = useState({
    templateName: "",
    templateCategory: "All",
    order: "Default",
    date: "Default",
  });

  const [nameOrder, setNameOrder] = useState("Default");

  const handleNameSearch = (e) => {
    setFilterOptions({
      ...filterOptions,
      templateName: e.target.value,
    });
    if (!filterOptions.templateName) {
      setFilteredTemplates(templates);
    }
  };

  useEffect(() => {
    const sortedTemplates = templates.filter((template) => {
      return (
        template.name
          .toLowerCase()
          .indexOf(filterOptions.templateName.toLowerCase()) !== -1
      );
    });
    setFilteredTemplates(sortedTemplates);
  }, [filterOptions.templateName, templates]);

  const handleCategoryChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      templateName: "",
      templateCategory: e.target.value,
      order: "Default",
      date: "Default",
    });
    if (filterOptions.templateCategory === "All") {
      setFilteredTemplates(templates);
    } else {
      const sortedTemplates = templates.filter((template) =>
        template.category.includes(filterOptions.templateCategory)
      );
      setFilteredTemplates(sortedTemplates);
    }
  };

  // const handleNameOrderChange = (e) => {
  //   setFilterOptions({
  //     ...filterOptions,
  //     order: e.target.value,
  //   });
  //   if (filterOptions.order === "Default") {
  //     // setFilteredTemplates(templates);
  //     return;
  //   } else if (filterOptions.order === "Ascending") {
  //     setFilteredTemplates(
  //       templates.sort((a, b) => {
  //         console.log(a.name, filterOptions.order);
  //         if (a.name > b.name) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //       })
  //     );
  //   } else if (filterOptions.order === "Descending") {
  //     setFilteredTemplates(
  //       templates.sort((a, b) => {
  //         console.log(b.name, filterOptions.order);
  //         if (b.name > a.name) return -1;
  //       })
  //     );
  //   }
  //   console.log(filteredTemplates);
  // };

  const handleNameOrder = (e) => {
    setNameOrder(e.target.value);
  };

  useEffect(() => {
    if (nameOrder === "Ascending") {
      setFilteredTemplates((filteredTemplates) =>
        filteredTemplates.sort((a, b) => {
          if (a.name > b.name) return 1;
        })
      );
      console.log(templates, "Hey");
      // setFilteredTemplates(sortedTemplates);
    } else if (nameOrder === "Descending") {
      setFilteredTemplates((filteredTemplates) =>
        filteredTemplates.sort((a, b) => {
          if (a.name < b.name) return -1;
        })
      );
      console.log(templates, "Hi");
    }
  }, [nameOrder, filteredTemplates]);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main">
      <FilterBox
        filterOptions={filterOptions}
        // handleFilterChange={handleFilterChange}
        handleCategoryChange={handleCategoryChange}
        handleNameSearch={handleNameSearch}
        // handleNameOrderChange={handleNameOrderChange}
        handleNameOrder={handleNameOrder}
        nameOrder={nameOrder}
      />
      <Banner />
      {status === "fetching" ? (
        <div>Currently fetching ----</div>
      ) : (
        <>
          <CardContainer
            templates={filteredTemplates}
            lastCard={indexOfLastCard}
            firstCard={indexOfFirstCard}
            category={filterOptions.templateCategory}
          />
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={filteredTemplates.length}
            paginate={handlePagination}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default TemplatesWrapper;
