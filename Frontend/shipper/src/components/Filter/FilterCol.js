import React from 'react'

const FilterCol = ({ columnFilters, setColumnFilters, hidden, nameInput }) => {
    if (hidden) return null;

    const onChangeFilter = (event) => {
        const newFilterValue = event.target.value;
        const newFilters = columnFilters.map(filter => {
            if (filter.id === nameInput) {
                return { ...filter, value: newFilterValue };
            }
            return filter;
        });

        if (!newFilters.find(filter => filter.id === nameInput)) {
            newFilters.push({ id: nameInput, value: newFilterValue });
        }

        setColumnFilters(newFilters);
    };

    return (
        <input
            type="text"
            onChange={onChangeFilter}
            placeholder={`Search ${nameInput}`}
            style={{ width: '100%' }}
        />
    );
};

export default FilterCol
