import {http, HttpResponse} from 'msw'

const domain = process.env.REACT_APP_API_URL

export const handlers = [
  http.get(`${domain}/about/intro`, () => {
    const intro = {
      message: "Hey! I’m David—great to see you here!\n " +
        "I built a simple portfolio page a while back but kept postponing it—well, it’s finally live!\n " +
        "I’m a Senior Software Engineer specializing in backend. " +
        "I have a LOT of interests and tend to explore them fully, so expect to see some interesting projects here!\n " +
        "You’ll also find my contact info and a peek into my passions. Enjoy exploring!",
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
          description: 'He\'s alright ',
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
      ]
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
      message: "Technology is always improving — and so am I.\n " +
        "Technology is my bread and butter. I've grown around it, worked with it, and played with it — " +
        "It's part of my personality and I try to learn and explore it as much as I can.\n " +
        "I'll post my personal projects here as a way to keep myself accountable.\n" +
        " Have fun exploring them!",
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
      message: "This section is all about games.\n " +
        "Since I was a kid I've loved video games, in fact, they were one of the main reasons I got interested in computers.\n " +
        "This page might be empty (it is for sure emptier than I'd like), but I'll keep adding new games I've made here. " +
        "Who knows — maybe one day you'll recognize one of the names!",
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
          "genre": "RPG",
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
          "genre": "RPG",
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
      message: "Finance is one of my passions. I read about it, study it, and pay attention to it in my daily life.\n " +
        "Since I was young, I’ve followed the stock market and economic news. " +
        "During my master’s thesis, I finally combined my passions for technology and finance—and I loved it.\n " +
        "Now, I’ll post my finance-related personal projects here, along with any certifications or extra courses I complete in my free time.",
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
