export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/survey-api',
  port: process.env.PORT || 5050,
  secret: process.env.SECRET || 'jwtnihafkn4914h0ifaub8801nviianoerfnaonf'
}
