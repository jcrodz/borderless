const mongoose = require('mongoose');
const Company = require('../models/company');
const dotenv = require('dotenv');

dotenv.config();
dotenv.load();


mongoose.connect(process.env.MONGODB_URI);

let companies = [
{name: 'Tiendeo',
 type: 'ecommerce',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1833513, 41.38065],
 icon: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAPqAAAAJGIwZmFhMjgzLWVlNDMtNDBlMi1hMjg3LTM3MDA4YzBmZDlkMA.png',
 website: 'https://www.tiendeo.com/',
 details: 'Perfil adecuado para Tiendeo, por experiencia, formación, competencias y habilidades, conocimientos de la tecnologías, superación de pruebas específicas.'
},

{name: 'Furgo',
 type: 'Logistics',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1635485, 41.3920533],
 icon: '',
 website: 'https://www.furgo.io/',
 details: 'Work experience in a specific field with scarcity locally'
},

{name: 'ClearPeaks',
 type: 'Consultancy',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1635485, 41.396059],
 icon: '',
 website: 'https://www.clearpeaks.com/',
 details: ''
},

{name: 'ForceManager',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1271933, 41.391067],
 icon: '',
 website: 'https://www.forcemanager.net/',
 details: ''
},

{name: 'Blueliv',
 type: 'Cyber Security',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 website: 'https://www.blueliv.com/',
 details: 'Cultural fit, experience in information security field.'
},

{name: 'Qumram',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1885423, 41.3960779],
 icon: '',
 website: 'https://www.qumram.com/',
 details: 'Outstanding and exceptional skills related to Fintech and/or IT domains.'
},

{name: 'Roche',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1737834, 41.3821379],
 icon: '',
 website: 'https://www.roche.com/',
 details: 'Only for Project Lead & Department Lead in Software, Architecture.'
},

{name: 'Be4Talent',
 type: 'Recruitment',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1397852, 41.3890202],
 icon: '',
 website: 'https://www.bet4talent.com/',
 details: 'Si pudiera permitirme contratar talento internacional sin pensar en que fuera o no extracomunicatorio, lo que más valoro es: expertís-seniority, experiencia en empresa relevante en el sector, actitud. Buscar al mejor, sin importar dónde esté localizado.'
},

{name: 'Photoslurp',
 type: 'Photography',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1906478, 41.406269],
 icon: '',
 website: 'https://www.hi.photoslurp.com/',
 details: "If I'm going through the trouble of getting in someone from a foreign country, I would want them to be very senior, have a lot of experience in what I need and be able to communicate well in English. Additional points: 1. I do not know what is involved in the process of getting someone a visa. How much does it cost me ? How long will it take ? Is it even possible for me as a startup to do so ? From what our lawyers have told us when we tried to do this last year: the person needs to have at least a Masters degree or even a PhD with a high salary. The person we wanted to hire from Turkey had only a BSc and his salary was that of a junior developer - clearly not a good fit for an employment visa."
},

{name: 'Interficie',
 type: 'Web Development',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1760347, 41.3840566],
 icon: '',
 website: 'https://www.interficie.com/',
 details: ""
},

{name: 'AncoraDual',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'JUNIOR-LEVEL',
 uxdeveloper: 'JUNIOR-LEVEL',
 coordinates: [2.1607026, 41.3814458],
 icon: '',
 website: 'https://www.ancoradual.com/',
 details: "ahora mismo no sabría decir"
},

{name: 'Privalia',
 type: 'Consumer Goods',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1952929, 41.3976522],
 icon: '',
 website: 'http://es.privalia.com/public/',
 details: "Experiencia y calidad en la parte técnica"
},

{name: 'Nice People At Work',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1954328, 41.4014331],
 icon: '',
 website: 'https://nicepeopleatwork.com/business-intelligence-company/',
 details: "It really depends on the candidate's requirements for getting a Visa (i.e. he/she is been living in Spain for 3 years and now can apply for a permanent residency > we would be willing to sponsor for any of the above. Otherwise it is restrictive to highly qualified professionals filling the requirements for the Blue Card)"
},

{name: 'Novicell',
 type: 'Consultancy',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1875623, 41.3948306],
 icon: '',
 website: 'https://www.novicell.es/',
 details: ""
},

{name: 'Signaturit',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'JUNIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1903543, 41.406177],
 icon: '',
 website: 'https://www.signaturit.com/en',
 details: "Foreign languages."
},

{name: 'Gindumac',
 type: 'Mechanical Contractor',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1875651, 41.394944],
 icon: '',
 website: 'https://www.gindumac.com',
 details: "Talented, open minded, hands-approach, fighter, gives it all for the vision."
},

{name: 'Celsa Group',
 type: 'Construction',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [1.9764693, 41.456105],
 icon: '',
 website: 'http://www.celsagroup.com/index.aspx?menu=none',
 details: "Very specialized employees difficult to find in the local market (+7y experience)."
},

{name: 'Social Point',
 type: 'Games',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'NONE',
 coordinates: [2.1899333, 41.4066969],
 icon: '',
 website: 'http://www.socialpoint.es/',
 details: "Our main criteria is the professional experience (Seniority) of the candidate."
},

{name: 'Puck Solutions',
 type: 'Software Development',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1662836, 41.3878395],
 icon: '',
 website: 'http://puck.eu/',
 details: "Relevant work experience and good command of English is a must. I would also requiere an easy-going and social person to mingle well in the team."
},

{name: 'NUMA',
 type: 'Startup Accelerator',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.1832719, 41.3808413],
 icon: '',
 website: 'http://puck.eu/',
 details: "Ease of process, spanish & english speaking."
},

{name: 'XING',
 type: 'Telecommunications',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1658357, 41.3927267],
 icon: '',
 website: 'https://www.xing.com/',
 details: "Experience in our field, people management competences."
},

{name: 'Multiplica',
 type: 'Marketing',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.178151, 41.3917122],
 icon: '',
 website: 'https://www.multiplica.com/',
 details: "Dependen mucho del país y la complejidad de la contratación, hemos llegado a tardar más de 1 año en realizar todo el proceso, así que sólo utilizamos esta opción como último recurso."
},

{name: 'Marsbased',
 type: 'Consultancy',
 city: 'Barcelona',
 description: 'NO',
 webdeveloper: 'NONE',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'NONE',
 coordinates: [2.1652905, 41.4100941],
 icon: '',
 website: 'https://marsbased.com/',
 details: ""
},

{name: 'flatfit',
 type: 'hospitality',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'JUNIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.0787275, 41.3947688],
 icon: '',
 website: 'http://flatfitapp.com/',
 details: "coste del sponsorship"
},

{name: 'Omitsis',
 type: 'Consultancy',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'JUNIOR-LEVEL',
 coordinates: [2.1787583, 41.396906],
 icon: '',
 website: 'http://www.omitsis.com/',
 details: "Spanish or Catalan language"
},

{name: 'Accenture',
 type: 'Consultancy',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'SENIOR-LEVEL',
 mobiledeveloper: 'SENIOR-LEVEL',
 uxdeveloper: 'SENIOR-LEVEL',
 coordinates: [2.126686, 41.3881229],
 icon: '',
 website: 'https://www.accenture.com/es-es/new-applied-now',
 details: "Work experience, foreign language proficiency, referrals."
},

{name: 'Waki.tv',
 type: 'Movie Rental',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.1964553, 41.395246],
 icon: '',
 website: 'https://es.wuaki.tv/',
 details: "Experiencia en nuestro sector."
},

{name: 'Ariel Insights',
 type: 'Utility Contractor',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'JUNIOR-LEVEL',
 mobiledeveloper: 'NONE',
 uxdeveloper: 'JUNIOR-LEVEL',
 coordinates: [2.1964553, 41.395246],
 icon: '',
 website: 'http://www.aerialai.com/',
 details: "Experiencia, idioma, predisposición, energía."
},

{name: 'Sage',
 type: 'SAAS',
 city: 'Barcelona',
 description: 'YES',
 webdeveloper: 'MID-LEVEL',
 mobiledeveloper: 'MID-LEVEL',
 uxdeveloper: 'MID-LEVEL',
 coordinates: [2.0768812, 41.4491122],
 icon: '',
 website: 'http://www.sage.es/',
 details: "Tanto a los trabajadores no comunitarios como a los comunitarios se les indica los documentos que necesita Sage para poder contratarlos y los lugares donde pueden conseguirlos. Es decir, la empresa les guía de dónde pueden gestionar la documentación, pero para poderlos contratar ellos han de proporcionar su documentación en regla."
},

]// Iteration #1

Company.create(companies, (err, docs)=> {
 if(err) { throw err}
 docs.forEach((company) => {
   console.log(company.name);
});

mongoose.connection.close();

});
