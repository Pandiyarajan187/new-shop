import React, { useContext, useEffect, useMemo, useState } from "react";
import authContext from "../context/authContext";
import Shop from './Shop'
// import Item from "./components/Item";

//Filter list by category in React JS
export default function CheckBox({categories , filteredList}) {


    return (
        <div className="app">
            <div className="sport-list">
                {categories.map((value, key) => {
                    {console.log(value)}
                    return <div class="form-check" key={key}>
                        <label class="form-check-label">
                            <input class="form-check-input"
                            id={`check${key}`}
                            name={`check${key}`}
                            // onChange={handleCategoryChange} 
                            type="checkbox"  />
                            {value.name}
                            <span class="form-check-sign">
                                <span class="check"></span>
                            </span>
                        </label>
                    </div>
                })}
            </div>
        </div>
    );
}






// import React, { useEffect, useMemo, useState } from "react";
// import Item from "./components/Item";
// import "./styles.css";

// //Filter list by category in React JS
// export default function App() {
//   // Default Value
//   var defaultSports = [
//     { name: "Table Tennis", category: "Indoor" },
//     { name: "Football", category: "Outdoor" },
//     { name: "Swimming", category: "Aquatics" },
//     { name: "Chess", category: "Indoor" },
//     { name: "BaseBall", category: "Outdoor" }
//   ];
//   const [sportList, setSportList] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState();

//   // Add default value on page load
//   useEffect(() => {
//     setSportList(defaultSports);
//   }, []);

//   // Function to get filtered list
//   function getFilteredList() {
//     // Avoid filter when selectedCategory is null
//     if (!selectedCategory) {
//       return sportList;
//     }
//     return sportList.filter((item) => item.category === selectedCategory);
//   }

//   // Avoid duplicate function calls with useMemo
//   var filteredList = useMemo(getFilteredList, [selectedCategory, sportList]);

//   function handleCategoryChange(event) {
//     setSelectedCategory(event.target.value);
//   }

//   return (
//     <div className="app">
//       <div className="filter-container">
//         <div>Filter by Category:</div>
//         <div>
//           <select
//             name="category-list"
//             id="category-list"
//             onChange={handleCategoryChange}
//           >
//             <option value="">All</option>
//             <option value="Outdoor">Outdoor</option>
//             <option value="Indoor">Indoor</option>
//             <option value="Aquatics">Aquatics</option>
//           </select>
//         </div>
//       </div>
//       <div className="sport-list">
//         {filteredList.map((element, index) => (
//           <Item {...element} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// }