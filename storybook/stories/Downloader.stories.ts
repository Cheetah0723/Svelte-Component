import { Story, Meta } from "@storybook/html";
import { createDownloader, DownloaderProps } from "./Downloader";

export default {
  title: "Components/Downloader",
  argTypes: {
    id: { control: { disable: true } },
    uri: { control: { type: "text" } },
    headers: { control: { type: "text" } },
  },
} as Meta;

const Template: Story<DownloaderProps> = (args) => createDownloader(args);

export const DownloaderTemplate = Template.bind({});
DownloaderTemplate.args = {
  id: "BasicDownloader",
};
