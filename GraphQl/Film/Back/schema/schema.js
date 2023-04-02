const graphql = require('graphql');
const _=require('lodash');
const{ GraphQLObjectType,GraphQLString, GraphQLSchema, GraphQLID } =graphql;

//data de test
var Movie=[
    {id:"1",Moviename:'Le seigneur des anneaux',gender1:'2',gender2:"1",director:"Peter Jackson"},
    {id:"2",Moviename:'Resident evil revelation',gender1:'6',gender2:"3",director:"Paul W anderson"},
    {id:"3",Moviename:'Star wars le retour du jedi',gender1:'4',gender2:"5",director:"George Lucas"}
];

var Authors=[
    {id:"1",DirectorName:'Peter Jackson'},
    {id:"2",DirectorName:'Jack Black'},
    {id:"3",DirectorName:'Paul W Anderson'},
    {id:"4",DirectorName:'George Lucas'},
];

var Gender=[
    {id:"1",GenderName:'Action'},
    {id:"2",GenderName:'Fantaisie'},
    {id:"3",GenderName:'Horreur'},
    {id:"4",GenderName:'Science Fiction'},
    {id:"5",GenderName:'Aventure'},
    {id:"6",GenderName:'Comedie'},
];


const MovieType = new GraphQLObjectType({
    name:"Film",
    fields:() => ({
        id:{type:GraphQLID},
        Moviename:{type:GraphQLString},
        gender1:{
            type:GenderType,
            resolve(parent, args)
            {
                return _.find(Gender,{id:parent.id});
            }
        },
        gender2:{
            type:GenderType,
            resolve(parent, args)
            {
                return _.find(Gender,{id:parent.id});
            }
        },


        director:{
            type:DirectorType,
            resolve(parent,args)
            {
                return _.find(Authors,{id:parent.id});
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name:"Realisateur",
    fields:() => ({
        id:{type:GraphQLID},
        DirectorName:{type:GraphQLString}       
    })
});

const GenderType = new GraphQLObjectType({
    name:"Genre",
    fields:() => ({
        id:{type:GraphQLID},
        GenderName:{type:GraphQLString}       
    })
});



const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie: {
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code pour acceder a la bdd
              return  _.find(Movie,{id:args.id});
            }
        },

        director: {
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code pour acceder a la bdd
              return  _.find(Authors,{id:args.id});
            }
        },

        gender: {
            type:GenderType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code pour acceder a la bdd
              return  _.find(Gender,{id:args.id});
            }
        }


    }
});




module.exports = new GraphQLSchema({
    query: RootQuery
})

