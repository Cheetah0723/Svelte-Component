import { Story, Meta } from "@storybook/html";
import { createLiveVideoPlayer, LiveVideoPlayerProps } from "./LiveVideo";

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
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<LiveVideoPlayerProps> = (args) =>
  createLiveVideoPlayer(args);

export const LiveVideoPlayer = Template.bind({});

LiveVideoPlayer.args = {
  id: "LiveVideoPlayer",
};
export const LiveVideoPlayerWithWidth = Template.bind({});
LiveVideoPlayerWithWidth.args = {
  width: 400,
  id: "LiveVideoPlayerWithWidth",
};
export const LiveVideoPlayerWithHeight = Template.bind({});

LiveVideoPlayerWithHeight.args = {
  height: 400,
  id: "LiveVideoPlayerWithHeight",
};
