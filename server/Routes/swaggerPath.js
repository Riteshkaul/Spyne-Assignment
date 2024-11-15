// swaggerPaths.js
module.exports = {
  "/signup": {
    post: {
      summary: "Create a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "User created successfully" },
        400: { description: "Invalid input" },
      },
    },
  },
  "/login": {
    post: {
      summary: "User login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Login successful and authentication cookie set" },
        400: { description: "Invalid credentials" },
      },
    },
  },
  "/car": {
    post: {
      summary: "Create a new car",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                tags: {
                  type: "array",
                  items: { type: "string" },
                },
                images: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Car created successfully" },
        400: { description: "Invalid input" },
      },
    },
  },
  "/car": {
    get: {
      summary: "Fetch all cars for the authenticated user",
      responses: {
        200: {
          description: "List of cars",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    tags: { type: "array", items: { type: "string" } },
                    images: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/car/{id}": {
    get: {
      summary: "Fetch car details by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID of the car to fetch",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Car details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  images: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    put: {
      summary: "Update a car's details",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID of the car to update",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                tags: { type: "array", items: { type: "string" } },
                images: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Car updated successfully" },
        400: { description: "Invalid input" },
      },
    },
    delete: {
      summary: "Delete a car by ID",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID of the car to delete",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Car deleted successfully" },
        404: { description: "Car not found" },
      },
    },
  },
};
