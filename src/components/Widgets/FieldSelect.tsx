import React, { useContext } from 'react';
import { BuilderContext } from '../Builder';
import { clone } from '../../utils/clone';
import { isOptionList } from '../../utils/types';

interface FieldSelectProps {
  selectedValue: string;
  id: string;
}

export const FieldSelect: React.FC<FieldSelectProps> = ({
  selectedValue,
  id,
}) => {
  const { fields, data, setData, onChange, components } = useContext(
    BuilderContext
  );

  const {
    form: { Select },
  } = components;

  const handleChange = (value: React.ReactText) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item: any) => item.id === id);
    const nextField = fields.filter(item => item.field === value)[0];

    clonedData[parentIndex].field = value;
    delete clonedData[parentIndex].value;
    delete clonedData[parentIndex].operators;
    delete clonedData[parentIndex].operator;

    switch (nextField.type) {
      case 'BOOLEAN':
        clonedData[parentIndex].value = false;
        break;

      case 'DATE':
        if (
          nextField.operators &&
          ['BETWEEN', 'NOT_BETWEEN'].includes(nextField.operators[0])
        ) {
          clonedData[parentIndex].value = ['', ''];
        } else {
          clonedData[parentIndex].value = '';
        }

        clonedData[parentIndex].operator =
          nextField.operators && nextField.operators[0];
        clonedData[parentIndex].operators = nextField.operators;
        break;

      case 'TEXT':
        if (
          nextField.operators &&
          ['BETWEEN', 'NOT_BETWEEN'].includes(nextField.operators[0])
        ) {
          clonedData[parentIndex].value = ['', ''];
        } else {
          clonedData[parentIndex].value = '';
        }

        clonedData[parentIndex].operator =
          nextField.operators && nextField.operators[0];
        clonedData[parentIndex].operators = nextField.operators;
        break;

      case 'NUMBER':
        if (
          nextField.operators &&
          ['BETWEEN', 'NOT_BETWEEN'].includes(nextField.operators[0])
        ) {
          clonedData[parentIndex].value = [0, 0];
        } else {
          clonedData[parentIndex].value = 0;
        }

        clonedData[parentIndex].operator =
          nextField.operators && nextField.operators[0];
        clonedData[parentIndex].operators = nextField.operators;
        break;

      case 'LIST':
        if (isOptionList(nextField.value)) {
          clonedData[parentIndex].value = nextField.value[0].value;
        }

        clonedData[parentIndex].operator =
          nextField.operators && nextField.operators[0];
        clonedData[parentIndex].operators = nextField.operators;
        break;

      case 'MULTI_LIST':
        if (isOptionList(nextField.value)) {
          clonedData[parentIndex].value = [];
        }

        clonedData[parentIndex].operator =
          nextField.operators && nextField.operators[0];
        clonedData[parentIndex].operators = nextField.operators;
        break;
      case 'STATEMENT':
        clonedData[parentIndex].value = nextField.value;
        break;
    }

    setData(clonedData);
    onChange(clonedData);
  };

  const fieldNames = fields.map(field => ({
    value: field.field,
    label: field.label,
  }));

  return (
    <Select
      values={fieldNames}
      selectedValue={selectedValue}
      onChange={handleChange}
    />
  );
};
