import {http, HttpResponse} from 'msw'

const domain = process.env.REACT_APP_API_URL;

export const handlers = [
  // Mock the /about/contact endpoint
  http.get(`${domain}/about/contact`, (req, res, ctx) => {
    const contact = {
      name: "John Doe",
        email: "johndoe@example.com",
        linkedin: "",
        github: "https://github.com/johndoe"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(contact);
  }),
]

