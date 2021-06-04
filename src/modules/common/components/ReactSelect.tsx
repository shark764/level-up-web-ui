import * as React from 'react';
import RSelect from 'react-select';

export function ReactSelect({
  options = [],
  width = '200px',
  isClearable = false,
  styles = {},
  ...rest
}: any) {
  return (
    <RSelect
      isClearable={isClearable}
      options={options}
      styles={{
        control: (provided, state) => ({
          ...provided,
          background: 'none',
          backgroundColor: '#393B60',
          border: '1px solid #5D5F83',
          borderRadius: 16,
          padding: 7,
          width: state.selectProps.width,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: 'none'
        }),
        menuList: (provided) => ({ ...provided, borderRadius: 12 }),
        menu: (provided, state) => ({
          ...provided,
          borderRadius: 12,
          width: state.selectProps.width
        }),
        singleValue: (provided, state) => ({
          ...provided,
          opacity: state.isDisabled ? 0.5 : 1,
          transition: 'opacity 300ms',
          fontSize: 16,
          color: '#5D5F83'
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: 18,
          color: state.isSelected ? '#393B60' : '#5D5F83',
          backgroundColor: state.isSelected ? '#C6D6EE' : '#F5F9FF',
          padding: 20,
          border: 'none',
          '&:hover': {
            backgroundColor: '#14162B',
            color: '#F5F9FF'
          }
        }),
        ...styles
      }}
      width={width}
      {...rest}
    />
  );
}
