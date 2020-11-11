import { useState, useEffect } from "react";
import { useFetch } from "../fetch-templates-hook/TemplatesHook";
import FilterBox from "./search-filter/index";
import CardContainer from "./card-container/index";
import "./_templates.scss";
import Banner from "./banner";
import Pagination from "./pagination";
import Loader from "./loader";
import ErrorBox from "./error";

const url =
  "https://front-end-task-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates";

const TemplatesWrapper = () => {
  const { status, templates, error } = useFetch(url);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [cardsPerPage] = useState(18);
  const indexOfLastCard = currentPage * cardsPerPage;

  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const [filterOptions, setFilterOptions] = useState({
    templateName: "",
    templateCategory: "All",
    nameOrder: "Default",
    date: "Default",
  });

  // Search with name
  const handleNameSearch = (e) => {
    setFilterOptions({
      ...filterOptions,
      templateName: e.target.value,
    });
  };

  //filter by category
  const handleCategoryChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      templateName: "",
      templateCategory: e.target.value,
      nameOrder: "Default",
      date: "Default",
    });
  };

  //order by name
  const handleNameOrder = (e) => {
    setFilterOptions({
      ...filterOptions,
      nameOrder: e.target.value,
    });
  };

  // order by date created

  const handleDateOrder = (e) => {
    setFilterOptions({
      ...filterOptions,
      date: e.target.value,
    });
  };

  useEffect(() => {
    let sortedTemplates = [...templates];

    if (filterOptions.templateName !== "") {
      sortedTemplates = sortedTemplates.filter((template) => {
        return (
          template.name
            .toLowerCase()
            .indexOf(filterOptions.templateName.toLowerCase()) !== -1
        );
      });
    }

    if (filterOptions.templateCategory !== "All") {
      sortedTemplates = sortedTemplates.filter((template) =>
        template.category.includes(filterOptions.templateCategory)
      );
    }
    if (filterOptions.nameOrder === "Ascending") {
      sortedTemplates.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (filterOptions.nameOrder === "Descending") {
      sortedTemplates.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    if (filterOptions.date === "Ascending") {
      sortedTemplates = sortedTemplates.sort((a, b) => {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      });
    } else if (filterOptions.date === "Descending") {
      sortedTemplates = sortedTemplates.sort((a, b) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
    }

    setFilteredTemplates(sortedTemplates);
  }, [filterOptions, templates]);

  // handle  pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="main">
      <FilterBox
        filterOptions={filterOptions}
        handleCategoryChange={handleCategoryChange}
        handleNameSearch={handleNameSearch}
        handleDateOrder={handleDateOrder}
        handleNameOrder={handleNameOrder}
        nameOrder={filterOptions.nameOrder}
      />
      <Banner />
      {status === "fetching" ? (
        <Loader />
      ) : status === "error" ? (
        <ErrorBox error={error} />
      ) : (
        <>
          <CardContainer
            templates={filteredTemplates}
            lastCard={indexOfLastCard}
            firstCard={indexOfFirstCard}
            category={filterOptions.templateCategory}
            totalTemplates={filteredTemplates.length}
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
