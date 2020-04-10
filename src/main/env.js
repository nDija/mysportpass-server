const config = function(){
  switch(process.env.NODE_ENV){
    case 'development':
      return {
        "logPath": "./logs/",
        "logLevel": "debug",
        "dburl": "localhost",
        "dbport": "27017",
        "db": "MySportPass"
      };

    case 'production':
      return {};

    default:
      return {};
  }
};

export default new config();