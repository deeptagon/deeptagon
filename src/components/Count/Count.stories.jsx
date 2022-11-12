import React, { useEffect, useState } from 'react'
import { Count } from './Count'

export default {
  title: 'Components/Count',
  component: Count,
  argTypes: {
    value: { control: 'number', defaultValue: 1},
    name: { control: 'text', defaultValue: "Item Name"},
  },
}

const Template = (args) => {
  const [value, setValue] = useState(1)
  useEffect(() => {
    setValue(args.value) 
  }, [args.value])
  
  return <Count value={value} name={args.name} onChange={setValue} />
}

export const Primary = Template.bind({})
