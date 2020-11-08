import { categories, order, date } from "./filter-options";

const FilterBox = (props) => {
  const {
    filterOptions,
    handleDateOrder,
    handleCategoryChange,
    handleNameSearch,
    handleNameOrder,
    nameOrder,
  } = props;

  return (
    <div className="filter-box">
      <div className="w-40 ">
        <label></label>
        <input
          value={filterOptions.templateName}
          onChange={handleNameSearch}
          placeholder="Search Templates"
          name="templateName"
        />
      </div>
      <div className="w-60 align-right">
        <div className="w-20">
          <span className="title">Sort By:</span>
        </div>
        <div className="w-20">
          <select
            value={filterOptions.templateCategory}
            onChange={handleCategoryChange}
            name="templateCategory"
            className="filter-control"
          >
            {categories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
          <label>Category</label>
        </div>
        <div className="w-20">
          <select
            value={nameOrder}
            onChange={handleNameOrder}
            name="nameOrder"
            className="filter-control"
          >
            {order.map((orderFilter, index) => (
              <option value={orderFilter} key={index}>
                {orderFilter}
              </option>
            ))}
          </select>
          <label>Order</label>
        </div>
        <div className="w-20">
          <select
            value={filterOptions.date}
            onChange={handleDateOrder}
            name="date"
            className="filter-control"
          >
            {date.map((dateFilter, index) => (
              <option value={dateFilter} key={index}>
                {dateFilter}
              </option>
            ))}
          </select>
          <label>Date</label>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
