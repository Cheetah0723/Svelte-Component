import { Story, Meta } from "@storybook/html";
import { createVideoCard, VideoCardProps } from "./LiveVideo";

const mediauri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export default {
  title: "Components/LiveVideoPlayer",
  args: {
    //👇 Now all Button stories will be primary.
    mediauri,
  },
  argTypes: {
    width: { control: { type: "range", min: 100, max: 2000, step: 25 } },
    height: { control: { type: "range", min: 100, max: 2000, step: 25 } },
    mediatype: { control: { type: "string" } },
  },
} as Meta;

const Template: Story<VideoCardProps> = (args) => createVideoCard(args);

export const BasicVideoCard = Template.bind({});

BasicVideoCard.args = {
  id: "BasicVideoCard",
};
export const BasicVideoCardWithWidth = Template.bind({});
BasicVideoCardWithWidth.args = {
  width: 400,
  id: "BasicVideoCardWithWidth",
};
export const BasicVideoCardWithHeight = Template.bind({});

BasicVideoCardWithHeight.args = {
  height: 400,
  id: "BasicVideoCardWithHeight",
};
