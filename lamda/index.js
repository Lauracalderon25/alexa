// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const reto = [
    "Hoy lleva agua en tu termo",
    "Hoy deja el auto en casa y camina",
    "Hoy reduce al minimo la impresiones",
    "Hoy si ves basura en la calle, recogela",
    "Hoy utiliza una bolsa de tela o canasta para realizar tus compras",
    "Hoy no compres tu comida en desechables, mejor lleva tus propios recipientes",

];
const nivel1 = [
    "Hoy bañate en menos de 5 minutos",
    "Hoy recicla",
    "Hoy solo abre la puerta del refrigerador solo cuando sea necesario",
    "Hoy utiliza el transporte publico",
    "Hoy separa tus desechos en organico e inorganico",
    "Hoy aprovecha al maximo la luz natural para realizar tus actividades",
];

const nivel2 = [
    "Hoy ayuda a limpiar las calles recogiendo la basura que veas cerca de tu casa",
    "Hoy utiliza pilas recargables ",
    "Hoy comparte tu auto o utliza una bicicleta para realizar tus activiades",
    "Hoy desconecta todos los electronicos que no estas utilizando",
    "Hoy lleva tus celulares viejitos a un centro de reciclaje",
];

const nivel3 = [
    "Hoy evita los productos de limpieza que dañan el medio ambiente",
    "Hoy usa la basura organica para generar composta",
    "Hoy lava tu auto con una cubeta",
    "Hoy riega el jardin en horas de poco sol para que el agua no se evapore",
    "Hoy cambia todos los focos incandescentes por focos ahorradores",
    "Hoy compra productos con menos envoltorios",
];

const animal = [
    "La población de rinocerontes de Sumatra en Malasia quedó en marzo del 2019 oficialmente extinta con la muerte del último ejemplar de esa especie en el país, una hembra de 25 años llamada Imam que padecía cáncer.",
    "Un sapo puertorriqueño en peligro de extinción nació por primera vez mediante fertilización in vitro en un intento de los científicos estadounidenses por evitar su desaparición, es el primero de más de 300 sapos conchos puertorriqueños que nacieron después del primer intento fallido.",
    "El último rinoceronte de Sumatra macho de Malasia murió, lo que deja a solo a una hembra de su misma especie en cautiverio en ese país. La Alianza de Rinocerontes de Borneo (BORA) confirmó la muerte del animal en una declaración en Facebook, diciendo: “Es con gran pesar que compartimos la trágica noticia de que Tam, el último rinoceronte macho de Malasia, ha fallecido”.",
    "La última hembra de tortuga gigante de caparazón blando del Yangtzé ha muerto en China, según medios estatales, lo que potencialmente condena a la especie a la extinción.",
    "El guacamayo de Spix se hizo famoso por la película de 20th Century Fox “Río” gracias al personaje del encantador loro Blu, que viaja miles de kilómetros en un intento de salvar su especie. Pero un estudio publicado esta semana descubrió que el ave originaria de Brasil ya se ha extinguido en la naturaleza.",
];

const climático = [
    "A lo largo de los últimos 50 años, las actividades humanas, y en particular la combustión de combustibles fósiles, han liberado cantidades de dióxido de carbono y otros gases de efecto invernadero suficientes para afectar al clima mundial.",
    "Del ecuador a los polos, el clima y la meteorología tienen grandes repercusiones directas e indirectas en la vida humana. Los fenómenos meteorológicos extremos, como las grandes lluvias, las inundaciones o los huracanes como el que arrasó Nueva Orleáns (EE.UU.) en agosto de 2005, ponen en peligro la salud y destruyen propiedades y medios de subsistencia.",
    "Las variaciones meteorológicas intensas a corto plazo también pueden afectar gravemente a la salud, causando estrés térmico o un frío extremo (hipotermia) y provocar el aumento de la mortalidad por enfermedades cardiacas y respiratorias.",
    "El aumento de la temperatura global modifica los niveles y la distribución estacional de partículas aéreas naturales (por ejemplo, el polen) y pueden provocar el asma.",
    "La elevación del nivel del mar, otra consecuencia del calentamiento global, aumenta el riesgo de inundación de las costas y podría causar desplazamientos de población.",
];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido al reto del dia. En esta aplicación, pódras ayudar al medio ambiente, a través de retos.Los retos son de niveles esta el nivel 1,2 y 3.¿Qué nivel deseas?. O también puedo brindarte noticias acerca del cambio climatico';
        const speakReprompt = " ¿Aceptas o tienes miedo?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const retodeldiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'retodeldia';
    },
    handle(handlerInput) {
        // const speakOutput = reto[Math.floor(Math.random()*reto.length)];
        //const speakOutput = animal[1];
        //const speakReprompt = "¿Aceptas el reto?";
        //const speakOutput = reto[Math.floor(Math.random()*reto.length)];
        //const speakOutput = animal[1];
        const request = handlerInput.requestEnvelope.request;
        var nivel = request.intent.slots.nivel.value;
        let speechOutput = '';
        switch (nivel) {
            case "uno": //nivel 1
                speechOutput = nivel1[Math.floor(Math.random() * nivel1.length)];
                break;
            case "dos": //nivel 2

                speechOutput = nivel2[Math.floor(Math.random() * nivel2.length)];
                break;

            case "tres": //nivel 3
                speechOutput = nivel3[Math.floor(Math.random() * nivel3.length)];
                break;

            default:
                speechOutput = 'Aun no tienes desbloqueado este nivel';
                break;
        }
        return handlerInput.responseBuilder
            .speak(`${speechOutput} para saber otro`)
            .reprompt('puedes decir dime otro para saber otro dato curioso')
            //.speak(speakOutput)
            //.reprompt(speakReprompt)
            .getResponse();
    }
}


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
        const speakOutput = 'You can say hello to me! How can I help?';

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
        const speakOutput = 'Goodbye!';
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
        retodeldiaIntentHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
