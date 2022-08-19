import React,{ useState } from 'react'

const RadioBox = ({ prices }) => {
    // eslint-disable-next-line

    const [value, setValue] = useState(0)
    const handleChange = (e) => {
        // handleFilter(e.target.value)
        setValue(e.target.value)
    }
    return (
        <div>
            {
                prices.map((price, key) => {
                    return  <div class="form-check" key={key}>
                                <label class="form-check-label" htmlFor={`radio${key}`}>
                                    <input class="form-check-input"  
                                    onChange={handleChange} 
                                    type="radio"
                                     value={`${price._id}`} 
                                     id={`radio${key}`} 
                                     name={price} />
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
