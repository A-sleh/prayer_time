

// All Cities of Syria
let cities = [
        {
            arabicCityName : 'حلب' ,
            englishCityName : 'Ḩalab'
        },
        {
            arabicCityName : 'الحسكة' ,
            englishCityName : 'Al Ḩasakah'
        },
        {
            arabicCityName : 'اللاذقية' ,
            englishCityName : 'Al Lādhiqīyah'
        },
        {
            arabicCityName : 'القنيطرة' ,
            englishCityName : 'Al Qunayţirah'
        },
        {
            arabicCityName : 'الرقة' ,
            englishCityName : '	Ar Raqqah'
        },
        {
            arabicCityName : 'السويداء' ,
            englishCityName : "As Suwaydā'"
        },
        {
            arabicCityName : 'درعا' ,
            englishCityName : "Dar'ā"
        },
        {
            arabicCityName : 'دير الزور' ,
            englishCityName : '	Dayr az Zawr'
        },
        {
            arabicCityName : 'دمشق' ,
            englishCityName : '	Dimashq'
        },
        {
            arabicCityName : 'حماة' ,
            englishCityName : '	Ḩamāh'
        },
        {
            arabicCityName : 'حمص' ,
            englishCityName : 'Ḩimş'
        },
        {
            arabicCityName : 'ادلب' ,
            englishCityName : 'Idlib'
        },
        {
            arabicCityName : 'ريف دمشق' ,
            englishCityName : '	Rīf Dimashq'
        },
        {
            arabicCityName : 'طرطوس' ,
            englishCityName : '	Ţarţūs'
        }, 
    ]

// set Selector by Cities name in arabic 
let SelectorContainer = document.getElementById('city-selector') ,
    cityName = document.getElementById('city-name') ,
    date = document.getElementById('data') ;

    FillCitiesNameInSelctor()

function FillCitiesNameInSelctor() {
    SelectorContainer.innerHTML = '' ; 
    for( citie of cities ) {
        let option = `<option>${citie.arabicCityName}</option>` ;
        SelectorContainer.innerHTML+= option ;
    }
}

// set paryer Times According to the city 
    // the default value 
    getPrayersTimingsOfCity('Ḩalab') ;
SelectorContainer.addEventListener( 'change' , function() {
    cityName.innerHTML = this.value ;
    getPrayersTimingsOfCity( this.value )
})

// Get data Frome Adhan API 
function getPrayersTimingsOfCity( city  ) {
    let param = {
        country : "SY" ,
        city : city ,
    }
    axios.get( 'http://api.aladhan.com/v1/timingsByCity' ,{
        params: param ,
    }).then( response => {
        let timing = response.data.data.timings ;
        fillTimeForParyer( "Fajr" , timing.Fajr) ;
        fillTimeForParyer( "Sunrise" , timing.Sunrise) ;
        fillTimeForParyer( "Dhuhr" , timing.Dhuhr) ;
        fillTimeForParyer( "Asr" , timing.Asr) ;
        fillTimeForParyer( "Sunset", timing.Sunset) ;
        fillTimeForParyer( "Isha", timing.Isha) ;

        let readable = response.data.data.date.readable ;
        let weekday = response.data.data.date.hijri.weekday.ar ;
        // set The date According to The country
        date.innerHTML = weekday + " " + readable ;
    })
}

function fillTimeForParyer( id , time ) {
    document.querySelector(`.${id}`).innerHTML = time ;
}
