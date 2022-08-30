
import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY as string,
  domain: 'db.us.fauna.com' 
})  


// fauna fnAEtMBPtJAAQhzWy9RpantBTO3S4QpnyXNTLF86