import "./DataForm.css";
import crossIcon from "../../../assets/icon-cross.png";
import ReactDatePicker from "react-datepicker";

const DataForm = ({
  formType,
  handleCloseForm,
  category,
  subCategory,
  value,
  date,
  description,
  setCategory,
  setSubCategory,
  setValue,
  setDate,
  setDescription,
  functionType,
}) => {
  // CATEGORY ARRAY
  const categoriesArray = ["Income", "Expense"];

  const handleSubmit = (event) => {
    event.preventDefault();
    functionType();
  };

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      <div className="data-form-header">
        <h2>{formType} Data</h2>
        <button onClick={handleCloseForm}>
          <img src={crossIcon} />
        </button>
      </div>

      <div className="data-form-content">
        <div className="data-form-content-div">
          <label>
            <p>Category:</p>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="data-form-content-categories"
              required
            >
              <option value=""></option>
              {categoriesArray.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          <label>
            <p>Sub Category:</p>
            <input
              type="text"
              value={subCategory}
              onChange={(event) => setSubCategory(event.target.value)}
              className="data-form-content-categories"
              maxLength="16"
              required
            />
          </label>
        </div>

        <div className="data-form-content-div">
          <label>
            <p>Date:</p>
            <ReactDatePicker
              selected={new Date(date)}
              onChange={(date) => setDate(date)}
              required
            />
          </label>

          <label>
            <p>Value:</p>
            <input
              type="text"
              value={value}
              onChange={(event) => {
                const newValue = event.target.value.replace(/[^0-9.]/g, "");
                setValue(newValue);
              }}
              maxLength="16"
              required
            />
          </label>
        </div>

        <div>
          <label>
            <p>Description:</p>
            <textarea
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            functionType();
          }}
          className="data-form-button"
        >
          {formType}
        </button>
      </div>
    </form>
  );
};

export default DataForm;
