import { defineField, defineType } from "sanity";

export const videoEntry = defineType({
  name: "videoEntry",
  title: "Video Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube / Vimeo — optional)",
      type: "url",
    }),
    defineField({
      name: "videoFile",
      title: "Video Upload (optional — upload your own video)",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail URL (external)",
      type: "url",
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image (upload)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "launchDate",
      title: "Launch Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
