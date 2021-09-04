import { Story, Meta } from "@storybook/html";
import { createVideoCard, VideoCardProps } from "./VideoCard";

export default {
  title: "Components/VideoCard",
  argTypes: {
    videosrc: { control: { type: "text" } },
    title: { control: { type: "text" } },

    description: { control: { type: "text" } },
    time: { control: { type: "date" } },
  },
} as Meta;

const videosrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const title = "aa";
const description = "6";
const datetest = "2021-08-15T18:55:22.135Z";

const Template: Story<VideoCardProps> = (args) => createVideoCard(args);

export const BasicVideoCard = Template.bind({});
BasicVideoCard.args = {
  videosrc,
  title,
  description,
  time: datetest,
  id: "BasicVideoCard",
};
