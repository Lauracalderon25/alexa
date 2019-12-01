// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');


const nivel1 = [
    "Hoy bañate en menos de 5 minutos",
    "Hoy recicla",
    "Hoy solo abre la puerta del refrigerador solo cuando sea necesario",
    "Hoy utiliza el transporte público",
    "Hoy separa tus desechos en orgánico e inorgánico",
    "Hoy aprovecha al máximo la luz natural para realizar tus actividades",
    "Hoy lleva agua en tu termo",
    "Hoy deja el auto en casa y camina",
];

const nivel2 = [
    "Hoy ayuda a limpiar las calles recogiendo la basura que veas cerca de tu casa",
    "Hoy útiliza pilas recargables ",
    "Hoy comparte tu auto o útiliza una bicicleta para realizar tus actividades",
    "Hoy desconecta todos los electrónicos que no estas útilizando",
    "Hoy lleva tus celúlares viejos a un centro de reciclaje",
     "Hoy reduce al minimo la impresiones",
    "Hoy si ves basura en la calle, recógela",
];

const nivel3 = [
    "Hoy évita los productos de limpieza que dañan el medio ambiente",
    "Hoy usa la basura orgánica para generar composta",
    "Hoy lava tu auto con una cubeta",
    "Hoy riega el jardín en horas de poco sol para que el agua no se evapore",
    "Hoy cambia todos los focos incandescentes por focos ahorradores",
    "Hoy compra productos con menos envoltorios",
    "Hoy utiliza una bolsa de tela o canasta para realizar tus compras",
    "Hoy no compres tu comida en desechables, mejor lleva tus propios recipientes",
];

const fallas=[
"Aún no has desbloqueado este nivel",
"Perdón, no te escuche bien",
"Lo siento, intentalo de nuevo",
"Aún no tenemos este nivel",
    
    ];

const animal = [
    "La población de rinocerontes de Sumatra en Malasia quedó en marzo del 2019 oficialmente extinta con la muerte del último ejemplar de esa especie en el país, una hembra de 25 años llamada Imam que padecía cáncer.",
    "Un sapo puertorriqueño en peligro de extinción nació por primera vez mediante fertilización in vitro en un intento de los científicos estadounidenses por evitar su desaparición, es el primero de más de 300 sapos conchos puertorriqueños que nacieron después del primer intento fallido.",
    "El último rinoceronte de Sumatra macho de Malasia murió, lo que deja a solo a una hembra de su misma especie en cautiverio en ese país. La Alianza de Rinocerontes de Borneo (BORA) confirmó la muerte del animal en una declaración en Facebook, diciendo: “Es con gran pesar que compartimos la trágica noticia de que Tam, el último rinoceronte macho de Malasia, ha fallecido”.",
    "La última hembra de tortuga gigante de caparazón blando del Yangtzé ha muerto en China, según medios estatales, lo que potencialmente condena a la especie a la extinción.",
    "El guacamayo de Spix se hizo famoso por la película de 20th Century Fox “Río” gracias al personaje del encantador loro Blu, que viaja miles de kilómetros en un intento de salvar su especie. Pero un estudio publicado esta semana descubrió que el ave originaria de Brasil ya se ha extinguido en la naturaleza.",
];

const climatico = [
    "A lo largo de los últimos 50 años, las actividades humanas, y en particular la combustión de combustibles fósiles, han liberado cantidades de dióxido de carbono y otros gases de efecto invernadero suficientes para afectar al clima mundial.",
    "Del ecuador a los polos, el clima y la meteorología tienen grandes repercusiones directas e indirectas en la vida humana. Los fenómenos meteorológicos extremos, como las grandes lluvias, las inundaciones o los huracanes como el que arrasó Nueva Orleáns (EE.UU.) en agosto de 2005, ponen en peligro la salud y destruyen propiedades y medios de subsistencia.",
    "Las variaciones meteorológicas intensas a corto plazo también pueden afectar gravemente a la salud, causando estrés térmico o un frío extremo (hipotermia) y provocar el aumento de la mortalidad por enfermedades cardiacas y respiratorias.",
    "El aumento de la temperatura global modifica los niveles y la distribución estacional de partículas aéreas naturales (por ejemplo, el polen) y pueden provocar el asma.",
    "La elevación del nivel del mar, otra consecuencia del calentamiento global, aumenta el riesgo de inundación de las costas y podría causar desplazamientos de población.",
];

const extinto = [
    "El oso polar,la razón principal del peligro que corren,es el deshielo del Ártico o Polo Norte, su hábitat natural.",
    "Rinoceron de Java, la razón principal del peligro es la caza, para después convertirse en adorno o la creencia, en China y en culturas orientales, de que su cuerno tiene propiedades curativas. ",
    "Los tigres, la razón principal del peligro es la caza, aunque también influye la deforestación, una consecuencia indirecta de la acción del ser humano.",
    "El canguro, la razón principal del peligro es la caza, este marsupial sufre sobre todo los efectos del calentamiento global.",
    "El atun rojo, la razón principal del peligro, es la utilización del atún rojo en el sushi de calidad del mercado. En estos momentos, ya existe una prohibición temporal para dejar de consumirlo de manera tan abusiva; de lo contrario, podría desaparecer.",
    "El gorila de montaña, las razones principales del peligro,  es la caza y el deterioro que ha sufrido su hábitat.",
    "Los pingüino, la razón principal es que sufren las consecuencias del deshielo y el calentamiento global.",
    "El perro salvaje africano, las razones principales del peligro, son por la presión tanto por la destrucción de su hábitat, como su caza ilegal por sus pieles y su captura vivos como mascota, pues en algunas zonas de África se han llegado a tener domesticados para su uso como guardianes, igual que ha sucedido con las hienas o, incluso, guepardos.",
    ];
    const respuesta = [
        "¿Quieres saber otro reto?, Sera divertido.",
        "¿Te gustaría hacer otro reto?,",
        "¿Quieres saber acerca de animales extinto? Dime, quiero saber de animales extintos",
        "¿Quieres saber acerca del cambio climático? Dime, quiero saber sobre el cambio climático",
        "¿Quieres saber acerca de animales en peligro de extinción? Dime, quiero saber sobre animales en peligro de extinción",
        ];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido al reto del dia. En esta aplicación, pódras ayudar al medio ambiente, a través de retos. Los retos son de niveles, está el nivel 1, 2 y 3. ¿Qué nivel deseas?. O también puedo brindarte noticias acerca del cambio climático y animales extintos o en peligro de extinción';
        const speakReprompt = " ¿Aceptas o tienes miedo?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

        
const animalIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'animal';
    },
    handle(handlerInput) {
     const speechOutput= animal[Math.floor(Math.random()*animal.length)];
        //var speechOutput= animal[1];
   
    
    return handlerInput.responseBuilder
     .speak(speechOutput + '. Nosotros somos la causa de la muerte de los animales, ya que no creamos conciencia, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};

const climaticoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'climatico';
    },
    handle(handlerInput) {
     const speechOutput= climatico[Math.floor(Math.random()*climatico.length)];
        //var speechOutput= climatico[1];
   
    
    return handlerInput.responseBuilder
 .speak(speechOutput + '. Estas conciente de esta problematica?, porque esto podria acabar con nuestro planeta, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};

 const extintoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'extinto';
    },
    handle(handlerInput) {
     const speechOutput= extinto[Math.floor(Math.random()*extinto.length)];
        //var speechOutput= extinto[1];
   
    return handlerInput.responseBuilder
 .speak(speechOutput + '. Cuida a los animales porque ellos tambien tienen sentimientos, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};   

const nivel1IntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'niveluno';
    },
    handle(handlerInput) {
     const speechOutput= nivel1[Math.floor(Math.random()*nivel1.length)];
        //var speechOutput= nivel1[1];
   
    return handlerInput.responseBuilder
   .speak(speechOutput + '. No olvides hacer tu reto, por que así ayudas al medio ambiente, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};   
const nivel2IntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'niveldos';
    },
    handle(handlerInput) {
     const speechOutput= nivel2[Math.floor(Math.random()*nivel2.length)];
        //var speechOutput= nivel2[1];
   
    return handlerInput.responseBuilder
    .speak(speechOutput + '. No olvides hacer tu reto, por que así ayudas al medio ambiente, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};   

const nivel3IntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'niveltres';
    },
    handle(handlerInput) {
     const speechOutput= nivel3[Math.floor(Math.random()*nivel3.length)];
        //var speechOutput= nivel3[1];
   
    return handlerInput.responseBuilder
    .speak(speechOutput + '. No olvides hacer tu reto, por que así ayudas al medio ambiente, ' + respuesta[Math.floor(Math.random()*respuesta.length)])
    .reprompt('no te escuche bien')
    .getResponse(); 
}
};  
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Me puedes decir aiudaaa';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adios, te me cuidas!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        animalIntentHandler,
        climaticoIntentHandler,
        extintoIntentHandler,
        nivel1IntentHandler,
        nivel2IntentHandler,
        nivel3IntentHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
