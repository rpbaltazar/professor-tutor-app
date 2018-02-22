export namespace Env {
    const global = {
      APP_VERSION: '0.3.1 Alpha',
      DATABASE_NAME: 'professor-tutor-app',
      DATABASE_LOCATION: 'default',
      APP_ENVIRONMENT: 'production',
      DATETIME_FORMAT: "MMM D, YYYY, h:mm A",
      TIMEZONE: "UTC",
      LOCALE: "pt"
    }

    const development = {
      MOBILE_API: 'http://127.0.0.1:3000/'
    }

    const staging = {
      MOBILE_API: ''
    }

    const production = {
      MOBILE_API: 'https://professor-tutor.herokuapp.com/'
    }

    function envSpecificVars(){
      switch(global.APP_ENVIRONMENT){
      case 'development':
        return development;

      case 'staging':
        return staging;

      case 'production':
        return production;
      }
    }

    export function getVersionInfo() {
      return `${global["APP_VERSION"]}-${global["APP_ENVIRONMENT"].charAt(0)}`;
    }

    export function getEnvValue(key: string) {
      let value = envSpecificVars()[key] || global[key];

      if(value == undefined) {
        return undefined;
      }

      return value;
    }

    export function appIsInDevMode() {
      return global.APP_ENVIRONMENT == 'development'
    }
  }
