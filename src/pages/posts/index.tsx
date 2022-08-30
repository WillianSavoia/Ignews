import { GetStaticProps } from 'next'
import Head from 'next/head'
import {createClient} from '../../services/prismic'
import * as prismicH from '@prismicio/helpers'

import styles from './styles.module.scss'
import Link from 'next/link'

type Post = {
    slug: string,
    tittle: string,
    excerpt: string,
    updatedAt: string
}

interface PublicationsProps {
    publications: Post[] | null
}

export default function Posts({publications}: PublicationsProps){
   return(
      <>
      <Head>
           <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
            {publications.map(post => (
                <Link href={`/posts/${post.slug}`} key={post.slug}>
                  <a key={post.slug}>    
                    <time>{post.updatedAt}</time>
                    <strong>{post.tittle}</strong>
                    <p>{post.excerpt.slice(0,247)}...</p>
                  </a>
            </Link>
            )) }
            
            
            
        </div>
      </main>
      </>
   )
}
 

export  const getStaticProps: GetStaticProps  = async ({previewData}) =>{ 
    const client = createClient({previewData})


    const response = await client.getAllByType(
   ('post')
    , {
        fetch: ['post.tittle', ' post.content'],
        pageSize: 100
    })

    const publications = response.map(post => {
        return {
            slug: post.uid,
            tittle: prismicH.asText(post.data.tittle),
            excerpt: post.data.content.find((content: { type: string }) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

 
    return {
        props: {
          publications
        }
    }
}
 

    