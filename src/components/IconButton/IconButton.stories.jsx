import React from 'react';

import { IconButton } from './IconButton';

export default {
  title: 'Components/Icon/IconButton',
  component: IconButton,
  argTypes: {
    className: { control: 'text' },
    alt: { control: 'text', defaultValue: "This is a tooltip text" },
    icon: { control: 'select', defaultValue: "Check", options: ["ArrowRight","Cart","Check","Plus","Minus","Check2","Cross"]},
    tooltipPlacement: { control: 'select', defaultValue: "bottom", options: ["top", "left", "right", "bottom"] },
    size: { control: 'number', defaultValue: 24 },
  },
};

const Template = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});