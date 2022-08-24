import React,{ useContext, useEffect, useState } from 'react'

const CheckBox = ({ categories, handleFilter  , reset, trigger}) => {

    const [checked, setChecked] = useState([])
    const [initial, setInitial] = useState(true)
    const handleChange = category => () => {
        const currentCategoryId = checked.indexOf(category) //Return the first index or -1
        //  console.log("currentCategoryId",category);

        const newCheckedCategoryId = [...checked]
        // console.log("currentCategoryId",currentCategoryId);
        /**
         * If currently checked was not already in checked state -> push
         * Else -> pull
        **/
       if (currentCategoryId === -1) {
           newCheckedCategoryId.push(category)
           console.log(newCheckedCategoryId, "newCheckedCategoryId");
       } else {
           newCheckedCategoryId.splice(currentCategoryId, 1)
           console.log(newCheckedCategoryId, "newCheckedCategoryId")
       }
    //   console.log(newCheckedCategoryId);
       setChecked(newCheckedCategoryId)
       handleFilter(newCheckedCategoryId)
    }

    useEffect(() => {
        if(!initial){
            setChecked([])
            handleFilter([])
            console.log('trigger', trigger)
        } else {
            setInitial(false)
        }  
    },[trigger])
    return (
        categories.map((value, key) => {
            return  <div class="form-check" key={key}>
                        <label class="form-check-label">
                            <input 
                            className={`check form-check-input`} 
                            // name={`check${key}`} 
                            onChange={handleChange(value._id)} 
                            type="checkbox" 
                            value={checked.indexOf(value._id === -1)} 
                            // checked={checked.indexOf(value._id) ? false : true} 
                            />
                                {value.name}
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                        </label>
                        {/* {console.log(categories)} */}
                    </div>
        })
        )
    }
    // <div className="custom-control custom-checkbox" >
    //         <input  className="custom-control-input" />
    //         <label className="custom-control-label" htmlFor={`check${key}`}></label>
    //     </div>

export default CheckBox
