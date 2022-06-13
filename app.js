require('dotenv').config()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const UAParser = require('ua-parser-js')

const app = express()
const path = require('path')
const port = 7700

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(errorHandler())

//serve scss styles
app.use(express.static(path.join(__dirname, 'public')))

const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  })
}

// Link Resolver
const handleLinkResolver = (doc) => {
  return doc.uid
  // if (doc.uid) {
  //   return doc.uid
  // }

  // Define the url depending on the document type
  // if (doc.type === 'page') {
  //   return '/page/' + doc.uid
  // }
  // else if (doc.type === 'blog_post') {
  //   return '/blog/' + doc.uid
  // }

  // Default to homepage
  // return '/'
}

// Middleware to inject prismic context
app.use((req, res, next) => {
  // res.locals.ctx = {
  //   endpoint: process.env.PRISMIC_ENDPOINT,
  //   linkResolver: handleLinkResolver,
  // }
  const ua = UAParser(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// ITEMS THAT SHOW IN ALL PAGES
const handleRequest = async (api) => {
  const about = await api.getSingle('about')
  const archive = await api.getSingle('archive')
  const home = await api.getSingle('home')
  const latestWork = await api.getSingle('latest_work')
  const meta = await api.getSingle('meta')
  const navigation = await api.getSingle('navigation')
  const playground = await api.getSingle('playground')
  const preloader = await api.getSingle('preloader')

  const { results: projects } = await api.query(
    Prismic.Predicates.at('document.type', 'project'),
    { fetchLinks: 'project.image' }
  )

  const { results: projects_archive } = await api.query(
    Prismic.Predicates.at('document.type', 'project_archive'),
    { fetchLinks: 'project.image' }
  )

  const assets = []

  //// Get all Image URLs from Home for preloader ////
  latestWork.data.projects_list.forEach((item) => {
    assets.push(item.project_image.url)
  })

  //// Get all Image URLs from Projects for preloader ////
  projects.forEach((project) => {
    // Main images
    assets.push(project.data.project_main_image.url)

    // Screen images
    project.data.body.forEach((item) => {
      if (item.primary.image) {
        // console.log(item.primary.image.url)
        assets.push(item.primary.image.url)
      }
      if (item.items) {
        item.items.forEach((el) => {
          if (el.image) {
            // console.log(el.image.url)
            assets.push(el.image.url)
          }
        })
      }
    })
  })

  //// Get all Image URLs from Projects Archive for preloader ////

  projects_archive.forEach((project_archive) => {
    project_archive.data.body.forEach((item) => {
      if (item.primary.image) {
        // console.log(item.primary.image.url)
        assets.push(item.primary.image.url)
      }
      if (item.items) {
        item.items.forEach((el) => {
          if (el.image) {
            // console.log(el.image.url)
            assets.push(el.image.url)
          }
        })
      }
    })
  })

  // console.log(assets)

  return {
    assets,
    about,
    archive,
    home,
    latestWork,
    meta,
    navigation,
    playground,
    preloader,
    projects,
    projects_archive,
  }
}

// ROUTES

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/home', {
    ...defaults,
  })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/about', { ...defaults })
})

app.get('/archive', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/archive', { ...defaults })
})

app.get('/latest', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/latest', { ...defaults })
})

app.get('/latest/:uid', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const projectLatest = await api.getByUID('project', req.params.uid)

  // console.log(project.data.body)
  // console.log(req.params.uid)

  res.render('pages/projectLatest', { ...defaults, projectLatest })
})

app.get('/archive/:uid', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  const projectArchive = await api.getByUID('project_archive', req.params.uid)

  res.render('pages/projectArchive', { ...defaults, projectArchive })
})

app.get('/contact', async (req, res) => {
  const api = await initApi(req)
  const contact = await api.getSingle('contact')
  const defaults = await handleRequest(api)

  res.render('pages/contact', { contact, ...defaults })
})

app.get('/playground', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/playground', { ...defaults })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
