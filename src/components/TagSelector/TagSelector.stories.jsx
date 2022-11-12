import React, { useEffect, useState } from 'react';

import { TagSelector } from './TagSelector';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TagSelector',
  component: TagSelector,
  argTypes: {
    value: { control: 'text', description: 'selected value', defaultValue: "tag 1"},
    options: { control: "array", description: 'string array of options',  defaultValue: ["tag 1", "tag 2"] },
  },
};
const Template = (args) => {
  const [value, setValue] = useState()
  useEffect(() => {
    setValue(args.value)
  },[args.value])
  return <TagSelector {...args} value={value} onChange={setValue} />
}
export const Primary = Template.bind({});