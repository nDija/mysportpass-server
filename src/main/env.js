const config = function(){
  switch(process.env.NODE_ENV){
    case 'development':
      return {
        "port": 8000,
        "logPath": "./logs/",
        "logLevel": "debug",
        "dbUrl": "localhost",
        "dbPort": "27017",
        "db": "MySportPass"
      };

    case 'production':
      return {};

    default:
      return {};
  }
};

export default new config();