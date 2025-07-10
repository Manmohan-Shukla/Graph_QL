import{ApolloServer}from"@apollo/server"
import{startStandaloneServer} from"@apollo/server/standalone"
import db from "./db.js"
import { typeDefs } from "./schema.js"
const resolvers = {
  Query:{//property
    games(){
        return db.games
    },
    authors(){
        return db.authors
    },
    reviews(){
        return db.reviews
    },
   review(_,args){
    return db.reviews.find((r)=>r.id===args.id)
   } ,
   game(_,args){
    return db.games.find((r)=>r.id===args.id)
   },
   author(_,args){
    return db.authors.find((r)=>r.id===args.id)
   }
  },
  Game:{ 
    reviews(parent){
        return db.reviews.filter((r)=>r.game_id===parent.id)
    }
  },
  Author:{ 
    reviews(parent){
        return db.reviews.filter((r)=>r.author_id===parent.id)
    }
  },
  Review:{ 
    author(parent){
        return db.authors.find((r)=>r.id===parent.author_id)
    },
    game(parent){
        return db.games.find((r)=>r.id===parent.game_id)
    },
  }
}

/* games{
    title
}
*/ 
 const server = new ApolloServer({
    typeDefs, //-- definition of types of data
    resolvers
 })

 const{url}=await startStandaloneServer(server,{
    listen:{port:4000}
 })

 console.log("server ready")  