

const app = new Vue( {
    el   : 'main',
    data : {
      position  : {
        lat     : 0,
        lon     : 0,
      },
      weather   : '',
      code      : 0,
      temp      : {
        kelvin  : 0.00,
        degrees : 0.00,
        unit    : 'ºC',
      },
      cityName  : '',
      country   : '',
      show      : true,
      display   : 'content'
    },
    
    // Tries to get the browser's location on start up.
    mounted ( ) {
      this.getLocation( )
    },
    methods : {
      // Gets the browser's global position and iniciates the AJAX call. If it can't, sets a flag.
      getLocation ( ) {
        const success = ( position ) => {
          this.position.lat = position.coords.latitude,
          this.position.lon = position.coords.longitude;
          this.getWeather( );
        }
    
        const error = ( e ) => {
          if ( e.code === 1 ) console.error( 'PERMISSION DENIED'    );
          if ( e.code === 2 ) console.error( 'POSITION UNAVAILABLE' );
          if ( e.code === 3 ) console.error( 'TIME OUT'             );
          if ( e.code === 0 ) console.error( 'UNKNOWN ERROR'        );
          // Gets the IP location if the user won't give permissions.
          axios.get( 'https://ipapi.co/json' )
            .then( results => {
              this.position.lat = results.data.latitude,
              this.position.lon = results.data.longitude;
              this.getWeather( );        
            } );
          this.show = false;
        }
    
        const OPTIONS = {
          enableHighAccuracy  : true,
          timeout             : 5000,
          maximumAge          : 0
        };
    
        const position = navigator.geolocation.getCurrentPosition( success,error,OPTIONS );
      },
      // Establishes the AJAX call, fetches results and does the initial set up.
      getWeather ( ) {  
        const URL  = `//api.openweathermap.org/data/2.5/weather?lat=${this.position.lat}&lon=${this.position.lon}&appid=2bf5db39bb937c37fad2d2df04ff5fed`;
  
        axios.get( URL )
        .then( results => {
          this.weather      = results.data.weather[0].main + ' (' + results.data.weather[0].description + ')';
          this.code         = results.data.weather[0].id;
          this.temp.kelvin  = ( results.data.main.temp ).toFixed( 1 );              // Kelvin
          this.temp.degrees = ( results.data.main.temp - 273.15 ).toFixed( 1 );     // K -> Celsius
          this.cityName     = results.data.name;
          this.country      = results.data.sys.country;
          this.display     += ' rotate';
          this.show         = false;
        } )
        .catch( err => console.log( err ) );
      },
      // Changes from Celsius to Fahrenheit and viceversa. Also, animate their transitions.
      C2F ( ) { 
        if ( this.temp.unit == 'ºC' ) {
          const celsius = ( this.temp.kelvin * 9 / 5 - 459.67 ).toFixed( 1 );
          TweenLite.to( this.$data.temp, 0.5, { degrees : celsius });
          this.temp.unit    = 'ºF';
        } else {
          const fahrenheit = ( this.temp.kelvin - 273.15 ).toFixed( 1 );
          TweenLite.to( this.$data.temp, 0.5, { degrees : fahrenheit });
          this.temp.unit    = 'ºC';
        }
      }
    },
    computed: {
      // Animates the degrees between celsius and fahrenheit.
      animateTemp ( ) {
        return Number( this.temp.degrees ).toFixed( 1 );
      },
      // Chooses a Weather Icon for each weather ID.
      weatherIcons ( ) {
        if ( this.code >= 200 && this.code <= 232 )
          return 'wi wi-thunderstorm';
        else if ( this.code >= 300 && this.code <= 321 )
          return 'wi wi-rain-mix';
        else if ( this.code >= 500 && this.code <= 531 )
          return 'wi wi-rain';
        else if ( this.code >= 600 && this.code <= 622 )
          return 'wi wi-snowflake-cold';
        else if ( this.code >= 701 && this.code <= 781 )
          return 'wi wi-fog';
        else if ( this.code >= 801 && this.code <= 804 )
          return 'wi wi-cloudy';
        else if ( this.code == 800 )
          return 'wi wi-day-sunny';
      }
    }
  } );