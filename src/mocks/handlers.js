import {http, HttpResponse} from 'msw'

const domain = process.env.REACT_APP_API_URL

export const handlers = [
  http.get(`${domain}/about/intro`, () => {
    const intro = {
      message: 'intro about',
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro)
  }),
  http.get(`${domain}/about/contact`, () => {
    const contact = {
      message: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        linkedin: '',
        github: 'https://github.com/johndoe',
      },
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(contact)
  }),
  http.get(`${domain}/about/contact-text`, () => {
    const contactText = {
      message: 'contact-text',
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(contactText)
  }),
  http.get(`${domain}/tech/intro`, () => {
    const intro = {
      message: 'intro tech',
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro)
  }),
  http.get(`${domain}/tech/projects`, () => {
    const projects = {
      message: [
        {
          title: 'tech project title',
          description: 'project description',
          link_to_git: 'https://github.com/johndoe',
        },
      ],
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(projects)
  }),
  http.get(`${domain}/games/intro`, () => {
    const intro = {
      message: 'intro games',
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro)
  }),
  http.get(`${domain}/games/genres`, () => {
    const genres = ['undefined', 'strategy', 'table top']
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(genres)
  }),
  http.get(`${domain}/games/projects`, () => {
    const projects = {
      message: [
        {
          title: 'game with rating title',
          genre: 'table top',
          description: 'game with rating description',
          link_to_git: '',
          link_to_store: 'https://github.com/othergame',
        },
        {
          title: 'game title',
          genre: 'strategy',
          description: 'game description',
          link_to_git: 'https://github.com/johndoe',
          link_to_store: 'https://github.com/game',
        },
      ],
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(projects)
  }),
  http.get(`${domain}/games/played/carousel`, () => {
    const games_played_carousel = {
      message: [
        {
          "title": "Skyrim",
          "genre": "rpg",
          "description": "A sprawling, snow-drenched Nordic realm to freely explore, brimming with epic dragon battles, rich lore, unforgettable quests, dynamic combat, and endless mod-friendly adventures.",
          "rating": 5
        },
        {
          "title": "DnD",
          "genre": "table top",
          "description": "Dungeons & Dragons is a boundless fantasy role-playing game full of imaginative storytelling, camaraderie, problem-solving, and epic quests—empowering creativity, teamwork, and adventure at every roll of the dice.",
          "rating": 5
        },
        {
          "title": "Age of Empires II",
          "genre": "strategy",
          "description": "Age of Empires II is a legendary real-time strategy game set in the Middle Ages—build thriving empires across 13 civilizations, master resource economy, epic battles, historic campaigns, and deep multiplayer—timeless classic",
          "rating": 4
        },
        {
          "title": "Final Fantasy 7",
          "genre": "rpg",
          "description": "Final Fantasy VII is a timeless, genre‑defining RPG—rich with unforgettable characters, sweeping eco‑drama, cinematic twists, iconic music, and deep, emotion‑driven storytelling that still enthralls",
          "rating": 4
        }
      ],
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(games_played_carousel)
  }),
  http.get(`${domain}/finance/intro`, () => {
    const intro = {
      message: 'intro finance',
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(intro)
  }),
  http.get(`${domain}/finance/projects`, () => {
    const projects = {
      message: [],
    }
    // Return mocked response when the request hits /about/contact
    return HttpResponse.json(projects)
  }),
]
