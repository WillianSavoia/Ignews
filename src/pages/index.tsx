import React from "react"
import Head from 'next/head';
import { GetStaticProps} from 'next';
import styles from './home.module.scss'
import { SubscribeButton } from "../component/subscribeButton";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
    <Head>
       <title>Home | Ig.News</title>
    </Head> 
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
       <span>
       👏 Hey, Welcome
       <h1>
        News about the <span>React</span> world.
       </h1>
       <p>Get access to all the publications <br />
        <span>for {product.amount} month</span>
       </p>
       <SubscribeButton priceId={product.priceId}/>
       </span>
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () =>{
   const price = await stripe.prices.retrieve('price_1LRqk3IhSApaLNtZtWcU6hHU' , 
   )

   const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
   };

          return{
            props: {
              product,
            },
            revalidate: 60 * 60 * 24,
          }
}
