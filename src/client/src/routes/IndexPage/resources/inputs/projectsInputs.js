export default [
  {
    name: "name",
    type: "string",
  },
  {
    name: "description",
    type: "string",
  },
  {
    name: "link",
    type: "object",
    fields: [
      {
        name: "info",
        type: "string",
      },
      {
        name: "type",
        type: "string",
      },
      {
        name: "link",
        type: "string",
      },
    ]
  },
];
