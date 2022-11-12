import React, { useEffect, useState } from 'react';

import { SearchableFilter } from './SearchableFilter';

export default {
  title: 'Components/SearchableFilter',
  component: SearchableFilter,
  argTypes: {
    value: { control: 'array', defaultValue: [2]},
    className: { control: 'text'},
    options: {
      control: 'array', defaultValue: [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" }]
    },
    counts: { control: 'object', defaultValue: { 1: 4, 2: 2, 3: 6 } },
    totalCount: { control: 'number', defaultValue: 12 }
  },
};

const Template = (args) => {
  const [value, setValue] = useState()
  useEffect(() => {
    setValue(args.value)
  },[args.value])
  return <SearchableFilter {...args} value={value} onChange={setValue} />
}
export const Primary = Template.bind({});