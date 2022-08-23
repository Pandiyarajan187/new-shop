import React,{ useState , useEffect } from 'react'

const RadioBox = ({ prices, handleFilter , trigger }) => {
    // eslint-disable-next-line
    const [value, setValue] = useState(0)
    const [initial, setInitial] = useState(true)

    const handleChange = (e) => {
        handleFilter(e.target.value)
        // console.log(e.target.value);
        setValue(e.target.value)
    }
    useEffect(() => {
        if(!initial){
            setValue(0)
            handleFilter([])
            console.log('trigger', trigger)
        } else {
            setInitial(false)
        }
    },[trigger])
    return (
        <div>
            {
                prices.map((price, key) => {
                    return  <div class="form-check" key={key}>
                                <label class="form-check-label" htmlFor={`radio${key}`}>
                                    <input 
                                    className={`set form-check-input`} 
                                    type="radio"
                                     onChange={handleChange} 
                                     value={`${price._id}`} 
                                     id={`radio${key}`} 
                                     name={price} 
                                     />
                                    {price.name}
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                })
            }
        </div>
    )
}

export default RadioBox
