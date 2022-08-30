import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import sm from '../../sm.json'


export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint)

export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  return '/'
}

export const createClient = (previewData: any ,req?:unknown ) => {
  const client = prismic.createClient(sm.apiEndpoint, previewData)

  prismicNext.enableAutoPreviews({
    client,
    req,
    previewData
  
    
  })

  return client
}