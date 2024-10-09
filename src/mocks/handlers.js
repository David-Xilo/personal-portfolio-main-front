import {http, HttpResponse} from 'msw'

const domain = process.env.REACT_APP_API_URL;

export const handlers = [
  http.get(`${domain}/about/intro`, () => {
    const intro = {
      message: "intro about"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro);
  }),
  http.get(`${domain}/about/contact`, () => {
    const contact = {
      message: {
        name: "John Doe",
        email: "johndoe@example.com",
        linkedin: "",
        github: "https://github.com/johndoe"
      }
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(contact);
  }),
  http.get(`${domain}/about/contact-text`, () => {
    const contactText = {
      message: "contact-text"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(contactText);
  }),
  http.get(`${domain}/tech/intro`, () => {
    const intro = {
      message: "intro tech"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro);
  }),
  http.get(`${domain}/tech/news`, () => {
    const news = {
      message: [
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/john",
        "description": "tech news description",
        "sentiment": "indifferent",
        "genre": "tech"
      },
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/johndoe",
        "description": "tech news description",
        "sentiment": "undefined",
        "genre": "tech"
      }
    ]
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(news);
  }),
  http.get(`${domain}/tech/news/topic-of-the-season`, () => {
    const topic = { message: {
      "news_list": [
        {
          "headline": "finance headline",
          "link_to_source": "https://www.linkedin.com/in/john-doe",
          "description": "finance news description",
          "sentiment": "bad",
          "genre": "finance"
        },
        {
          "headline": "gaming headline",
          "link_to_source": "https://www.linkedin.com/in/doe",
          "description": "gaming news description",
          "sentiment": "good",
          "genre": "gaming"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/john",
          "description": "tech news description",
          "sentiment": "indifferent",
          "genre": "tech"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/johndoe",
          "description": "tech news description",
          "sentiment": "undefined",
          "genre": "tech"
        }
      ],
      "topic_of_the_season": {
        "topic": "tech topic",
        "genre": "tech",
        "topic_timestamp": "2024-09-28T06:35:27.798328Z",
        "type": "1w",
        "custom_start": null,
        "custom_end": null
      }
    }
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(topic);
  }),
  http.get(`${domain}/tech/projects`, () => {
    const projects = { message: [
      {
        "title": "tech project title",
        "description": "project description",
        "link_to_git": "https://github.com/johndoe"
      }
    ]
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(projects);
  }),
  http.get(`${domain}/games/intro`, () => {
    const intro = {
      message: "intro games"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro);
  }),
  http.get(`${domain}/games/genres`, () => {
    const genres = [
      "undefined",
      "strategy",
      "table top"
    ]
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(genres);
  }),
  http.get(`${domain}/games/news`, () => {
    const news = { message: [
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/john",
        "description": "tech news description",
        "sentiment": "indifferent",
        "genre": "tech"
      },
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/johndoe",
        "description": "tech news description",
        "sentiment": "undefined",
        "genre": "tech"
      }
    ]
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(news);
  }),
  http.get(`${domain}/games/news/topic-of-the-season`, () => {
    const topic = { message: {
      "news_list": [
        {
          "headline": "finance headline",
          "link_to_source": "https://www.linkedin.com/in/john-doe",
          "description": "finance news description",
          "sentiment": "bad",
          "genre": "finance"
        },
        {
          "headline": "gaming headline",
          "link_to_source": "https://www.linkedin.com/in/doe",
          "description": "gaming news description",
          "sentiment": "good",
          "genre": "gaming"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/john",
          "description": "tech news description",
          "sentiment": "indifferent",
          "genre": "tech"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/johndoe",
          "description": "tech news description",
          "sentiment": "undefined",
          "genre": "tech"
        }
      ],
      "topic_of_the_season": {
        "topic": "tech topic",
        "genre": "tech",
        "topic_timestamp": "2024-09-28T06:35:27.798328Z",
        "type": "1w",
        "custom_start": null,
        "custom_end": null
      }
    }
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(topic);
  }),
  http.get(`${domain}/games/projects`, () => {
    const projects = { message: [
      {
        "title": "game with rating title",
        "genre": "table top",
        "description": "game with rating description",
        "link_to_git": "",
        "link_to_store": "https://github.com/othergame"
      },
      {
        "title": "game title",
        "genre": "strategy",
        "description": "game description",
        "link_to_git": "https://github.com/johndoe",
        "link_to_store": "https://github.com/game"
      }
    ] }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(projects);
  }),
  http.get(`${domain}/finance/intro`, () => {
    const intro = {
      message: "intro finance"
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro);
  }),
  http.get(`${domain}/finance/news`, () => {
    const news = { message: [
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/john",
        "description": "tech news description",
        "sentiment": "indifferent",
        "genre": "tech"
      },
      {
        "headline": "tech headline",
        "link_to_source": "https://www.linkedin.com/in/johndoe",
        "description": "tech news description",
        "sentiment": "undefined",
        "genre": "tech"
      }
    ] }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(news);
  }),
  http.get(`${domain}/finance/news/topic-of-the-season`, () => {
    const topic = { message: {
      "news_list": [
        {
          "headline": "finance headline",
          "link_to_source": "https://www.linkedin.com/in/john-doe",
          "description": "finance news description",
          "sentiment": "bad",
          "genre": "finance"
        },
        {
          "headline": "gaming headline",
          "link_to_source": "https://www.linkedin.com/in/doe",
          "description": "gaming news description",
          "sentiment": "good",
          "genre": "gaming"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/john",
          "description": "tech news description",
          "sentiment": "indifferent",
          "genre": "tech"
        },
        {
          "headline": "tech headline",
          "link_to_source": "https://www.linkedin.com/in/johndoe",
          "description": "tech news description",
          "sentiment": "undefined",
          "genre": "tech"
        }
      ],
      "topic_of_the_season": {
        "topic": "tech topic",
        "genre": "tech",
        "topic_timestamp": "2024-09-28T06:35:27.798328Z",
        "type": "1w",
        "custom_start": null,
        "custom_end": null
      }
    }
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(topic);
  }),

]

