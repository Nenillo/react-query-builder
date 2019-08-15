import React, { useContext } from 'react';
import { BuilderContext } from '../Builder';
import { clone } from '../../utils/clone';

export interface BooleanProps {
  selectedValue: boolean;
  id: string;
}

export const Boolean: React.FC<BooleanProps> = ({ selectedValue, id }) => {
  const { data, setData, onChange, components } = useContext(BuilderContext);

  const {
    form: { Switch },
  } = components;

  const handleChange = (value: boolean) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item: any) => item.id === id);

    clonedData[parentIndex].value = value;

    setData(clonedData);
    onChange(clonedData);
  };

  return <Switch onChange={handleChange} switched={selectedValue} />;
};