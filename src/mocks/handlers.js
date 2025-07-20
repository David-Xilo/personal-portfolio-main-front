import {http, HttpResponse} from 'msw'

const domain = process.env.REACT_APP_API_URL

export const handlers = [
  http.post(`${domain}/auth/token`, () => {
    return HttpResponse.json({
      token: 'mocked-access-token',
      expires_in: 3600,
    })
  }),
  http.get(`${domain}/about/contact`, () => {
    const contact = {
      message: {
        name: 'John Doe',
        email: 'john.doe@mail.com',
        linkedin: 'linkedin/johndoe',
        github: 'https://github.com/johndoe',
        credly: 'https://github.com/johndoe',
      },
    }
    return HttpResponse.json(contact)
  }),
  http.get(`${domain}/about/reviews/carousel`, () => {
    const contact = {
      message: [
        {
          author: 'My Mom',
          rating: 5,
          description: 'The most handsome!',
        },
        {
          author: 'My Girlfriend',
          rating: 5,
          description: 'He can be a sweetie',
        },
        {
          author: 'My Best Friend',
          rating: 4,
          description: "He's alright ",
        },
        {
          author: 'My Third Grade Teacher',
          rating: 3,
          description: 'Could have been worse',
        },
        {
          author: 'My Siblings',
          rating: 1,
          description: 'Pure annoyance',
        },
      ],
    }
    return HttpResponse.json(contact)
  }),
  http.get(`${domain}/tech/projects`, () => {
    const projects = {
      message: [
        {
          title: 'tech project title',
          description: 'project description',
          repositories: [
            {
              title: 'repo 1',
              description: 'repo 1 description',
              link_to_git: 'https://github.com/johndoe/1',
            },
            {
              title: 'repo 2',
              description: 'repo 2 description',
              link_to_git: 'https://github.com/johndoe/2',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
          ],
        },
        {
          title: 'tech project title 2',
          description: 'project description 2',
          repositories: [],
        },
      ],
    }
    return HttpResponse.json(projects)
  }),
  http.get(`${domain}/games/projects`, () => {
    const projects = {
      message: [
        {
          title: 'game with rating title',
          genre: 'table top',
          description: 'game with rating description',
          link_to_store: 'https://github.com/othergame',
          repositories: [
            {
              title: 'repo 1',
              description: 'repo 1 description',
              link_to_git: 'https://github.com/johndoe/1',
            },
            {
              title: 'repo 2',
              description: 'repo 2 description',
              link_to_git: 'https://github.com/johndoe/2',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
            {
              title: 'repo 3',
              description: 'repo 3 description',
              link_to_git: 'https://github.com/johndoe/3',
            },
          ],
        },
        {
          title: 'game title',
          genre: 'strategy',
          description: 'game description',
          link_to_store: 'https://github.com/game',
          repositories: [],
        },
        {
          title: 'game title',
          genre: 'RPG',
          description: 'game description',
          link_to_store: 'https://github.com/game',
          repositories: [],
        },
      ],
    }
    return HttpResponse.json(projects)
  }),
  http.get(`${domain}/games/played/carousel`, () => {
    const games_played_carousel = {
      message: [
        {
          title: 'Skyrim',
          genre: 'RPG',
          description:
            'A sprawling, snow-drenched Nordic realm to freely explore, brimming with epic dragon battles, rich lore, unforgettable quests, dynamic combat, and endless mod-friendly adventures.',
          rating: 5,
        },
        {
          title: 'DnD',
          genre: 'table top',
          description:
            'Dungeons & Dragons is a boundless fantasy role-playing game full of imaginative storytelling, camaraderie, problem-solving, and epic quests—empowering creativity, teamwork, and adventure at every roll of the dice.',
          rating: 5,
        },
        {
          title: 'Age of Empires II',
          genre: 'strategy',
          description:
            'Age of Empires II is a legendary real-time strategy game set in the Middle Ages—build thriving empires across 13 civilizations, master resource economy, epic battles, historic campaigns, and deep multiplayer—timeless classic',
          rating: 4,
        },
        {
          title: 'Final Fantasy 7',
          genre: 'RPG',
          description:
            'Final Fantasy VII is a timeless, genre‑defining RPG—rich with unforgettable characters, sweeping eco‑drama, cinematic twists, iconic music, and deep, emotion‑driven storytelling that still enthralls',
          rating: 4,
        },
      ],
    }
    return HttpResponse.json(games_played_carousel)
  }),
  http.get(`${domain}/finance/projects`, () => {
    const projects = {
      message: [],
    }
    return HttpResponse.json(projects)
  }),
]
