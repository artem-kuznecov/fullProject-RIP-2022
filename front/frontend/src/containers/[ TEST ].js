import React, {useState} from 'react';

const Test = () => {
    const [value, setValue] = useState('not selected');
    // setValue("ничего не выбрано")

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className='d-flex justify-center'>
            <h2>Выпадающий список: </h2>
            <select className='dropdown-selector' value={value} onChange={handleChange}>
                <option selected value='' hidden></option>
                <option value="grapefruit">Грейпфрут</option>
                <option value="lime">Лайм</option>
                <option value="coconut">Кокос</option>
                <option value="mango">Манго</option>
            </select>
            <h2>
                ваш выбор: {value}
            </h2>
        </div>
    );
};
export default Test;