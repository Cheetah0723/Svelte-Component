import { Story, Meta } from "@storybook/html";
import { createVideoGallery, VideoGalleryProps } from "./VideoGallery";

const cards = [
  {
    title: "bau",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:30.565Z",
  },
  {
    title: "bb1",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
    time: "2021-08-06T22:46:31.565Z",
  },
  { title: "bb2", time: "2021-08-02T22:46:32.565Z" },
  {
    title: "ss",
    time: "2021-08-06T22:46:34.565Z",
    description: "fffffff",
    testnested: { nested: "dddd" },
  },
  {
    title: "bb4",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc: "https://www.youtube.com/embed/tgbNymZ7vqY",
    provider: "youtube",
  },
  { title: "aa5", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb6", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb7", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb8", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb9", time: "2021-08-06T22:46:33.565Z" },
  { title: "bb10", time: "2021-08-06T22:46:34.565Z" },
  { title: "bb11", time: "2021-08-06T22:46:34.565Z" },
  {
    title: "bb12",
    time: "2021-08-06T22:46:34.565Z",
    videoSrc:
      "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
  },
  { title: "bb13", time: "2021-08-07T22:46:39.565Z" },
];
const headers = [
  {
    label: "title",
    key: "title",
    search: true,
  },
  {
    label: "description",
    key: "description",
  },
  {
    label: "nested",
    key: "testnested.nested",
  },
  {
    label: "data",
    key: "time",
    type: "datetime",
    format: "DD MMMM YYYY",
  },
];

export default {
  title: "Contents/VideoGallery",
  argTypes: {
    size: { control: { type: "range", min: 1, max: cards.length + 2 } },
    page: { control: { type: "number" } },
    resturi: { control: { type: "object" } },
    primarycolor: { control: { type: "color" } },
    pagechange: { action: "pagechangeEvent" },
    externalfilter: { control: { type: "boolean" } },
    textFilterVideos: { action: "textFilterVideosEvent" },
    dateFilterVideos: { action: "dateFilterVideosEvent" },
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<VideoGalleryProps> = (args) => createVideoGallery(args);

export const BasicVideoGallery = Template.bind({});
BasicVideoGallery.args = {
  cards,
  headers,
  id: "BasicVideoGallery",
};

export const BasicVideoGalleryRest = Template.bind({});
BasicVideoGalleryRest.args = {
  cards,
  headers,
  id: "BasicVideoGalleryRest",
  externalfilter: true,
};

BasicVideoGallery.parameters = {
  docs: {
    source: {
      code: "Some custom string here",
    },
  },
};
