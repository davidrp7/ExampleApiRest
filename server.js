const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000


var places = [
    {
		id: '1', 
		title: 'Laguna de la Cocha', 
		ubc: 'Pasto', 
		img:'http://xn--nario-rta.gov.co/turismo/images/lcocha1.jpg?crc=126793232'	
		desc: 'La laguna de la Cocha, también llamada lago Guamuez, es en un gran embalse natural de origen glacial, ubicado en la locación colombiana de El Encano, corregimiento del municipio de Pasto, en el departamento de Nariño. Es el segundo cuerpo de agua natural más grande de la nación, después del lago de Tota. En el año 2000, mediante el decreto 698 del 18 de abril, Colombia inscribió la laguna de La Cocha o lago Guamuez como humedal de importancia nacional e internacional dentro del Convenio de Ramsar, siendo el primero con esta calificación en la región andina colombiana'
	},
    
	{
		id: '2', 
		title: 'Santuario de las Lajas', 
		ubc: 'Ipiales', 
		img:'http://www.lanacion.com.co/wp-content/uploads/2017/10/Catedral-de-las-Lajas-696x392.jpg'
		desc: 'El Santuario de Nuestra Señora del Rosario de las Lajas es un templo y basílica para el culto cristiano y veneración de Nuestra Señora de las Lajas el edificio principal mide 27.50 metros la altura hasta la torre es de 100 metros y el puente mide a 50 metros de alto por 17 metros de ancho y 20 de largo este santuario se ubica en Ipiales, Departamento de Nariño, sur de la República de Colombia y es destino de peregrinación y turismo desde el siglo XVIII.'
	},
	
	{
		id: '3', 
		title: 'Museo Taminango', 
		ubc: 'Pasto', 
		img:'http://farm4.static.flickr.com/3778/12997665185_072be9162f.jpg'
		desc: 'El Museo Taminango de Artes y Tradiciones Populares de Nariño, a menudo llamado "Casona Taminango" está situado en San Juan de Pasto, Colombia y funciona en una edificación que data del siglo XVII elevada a la categoría de Monumento Nacional en 1971. El museo está dedicado a exhibir muestras de los procesos artesanales típicos de la región y también incluye la imprenta de tipos griegos que el Dr. Leopoldo López Álvarez usó para publicar versiones bilingües de los clásicos griegos, así como muestras de su obra.'
	},
	
	{
		id: '4',
		title: 'Volcan de Cumbal', 
		ubc: 'Cumbal', 
		img:'http://www.colombia.travel/sites/default/files/styles/activity_banner/public/24_procolombia.jpg?itok=tYBOEPpt'
		desc: 'El volcán Cumbal es el más alto del sur de Colombia, en el departamento de Nariño, con una altitud de 4.764 msnm. En el pasado se extraía azufre de sus fumarolas y cráter usando métodos tradicionales de minería. Los mineros también explotaban el hielo, que en algunas estaciones cubre su cima, para ofrecerlo en el mercado de Ipiales'
	},
	
	{
		id: '5',
		title: 'Museo del Oro', 
		ubc: 'Pasto', 
		img:'http://proyectos.banrepcultural.org/museo-del-oro-narino/sites/default/files/adjuntos/monarino02_1.jpg'
		desc: 'El Museo del Oro Nariño del Banco de la República en Pasto, Nariño, ofrece a sus visitantes una extraordinaria colección, parte del legado arqueológico del sur de Colombia, junto con una historia que vincula el pasado con el presente. Las obras de orfebrería y cerámica de las sociedades que poblaron la cordillera de los Andes en la época prehispánica dialogan en cada vitrina con las de quienes vivieron en la costa del Pacífico, y así narran la vida, los saberes y las artes de sociedades creativas y laboriosas que hicieron posible la rica diversidad de hoy.'
	},
	
	{
		id: '6',
		title: 'Volcan Galeras', 
		ubc: 'Pasto', 
		img:'http://p8.storage.canalblog.com/87/70/1014638/77045482_o.jpg'
		desc: 'El Galeras es un volcán del sur de Colombia, situado a 9 km de la ciudad de San Juan de Pasto, capital del departamento de Nariño. Es uno de los volcanes con mayor actividad en Colombia y el que cuenta con mayores registros históricos, con noticia de erupciones importantes desde el siglo xvi.'
	},
	
	{
		id: '7',
		title: 'Volcan Azufral', 
		ubc: 'Tuquerres', 
		img:'http://www.colparques.net/images/azufral/4.jpg'
		desc: 'El Azufral es un volcán semiactivo en la región andina del departamento colombiano de Nariño. Tiene una elevación de 4070 msnm. Está considerado como reserva natural por el Consejo Directivo de Corponariño. Se destacan las tres lagunas La Negra, La Blanca y La Verde, siendo esta última la de mayor atractivo, razón por la que es visitada en todas las épocas del año por miles de turistas de todas partes del mundo. El acceso se realiza principalmente desde Túquerres, aunque también puede realizarse y tiene mayor diversidad natural desde el corregimiento.'
	},
	
	{
		id: '8',
		title: 'Parque Sanquianga', 
		ubc: 'El Charco', 
		img:'http://www.colparques.net/images/sanquianga/4.jpg'
		desc: 'Posee gran cantidad de ecosistema manglar, equivalente al 53% de los manglares del departamento de Nariño y 20% del Pacífico colombiano. Este ecosistema por su productividad es la base de alimentación y reproducción de diversidad de especies marinas y de estuarios, y lugar de nidación de diferentes especies de aves. Posee abundantes esteros y deltas influidos por los ríos Sanquianga, Patía, La Tola, Aguacatal y Tapaje, y numerosas islas pobladas por diversos árboles, típicos del manglar y del bosque húmedo tropical, aves residentes y migratorias, igualmente posee gran extensión de playas donde anidan tortugas marinas.'
	},
	
	{
		id: '9',
		title: 'Parque Natural Chimayoy', 
		ubc: 'Pasto', 
		img:'http://www.turismopasto.gov.co/images/ecologico/chimayoy.jpg'
		desc: 'Su nombre significa ir al encuentro con el sol, está ubicado a 4 Km de Pasto, sobre la vía panamericana. Un lugar ideal para disfrutar de la naturaleza y descansar. El objetivo de éste es informar a turistas y pastusos, sobre las medidas de cuidado ambiental. En el centro hay senderos perfectos para caminatas ecológicas mientras realizas actividades relacionadas con el cuidado del medio ambiente.'
	}
];


//*************************************************************

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.status(200).send("Bienvenido a TURISMO API REST")
})

//*************************************************************


//Listar los lugares
app.get('/places', (req, res) => {
    res.send(places)
})

//*************************************************************


// Validar user and pass 
app.post('/login', (req, res) => {
    let data = req.body;
    let login = [{searchUser: false,id: '0',user: '',password: '',name: '',email: '',img_user:''}];

    users.some(function (value, index, _arr) {
        if( (value.user == data.user) && (value.password == data.pass) ){
            login[0]['searchUser'] = true;
            login[0]['id'] = value.id;
            login[0]['user'] = value.user;
            login[0]['password'] = value.password;
            login[0]['name'] = value.name;
            login[0]['email'] = value.email;
            login[0]['img_user'] = value.img_user;
            return true;
        }else{
            return false;
        }
    });

    res.send(login)
})

// Metodo para crear una cuenta de usuario
app.post('/signup', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    // let itemUser = {
    //     id: consecutive,
    //     user: data.user,
    //     password: data.pass,
    //     name: data.name,
    //     email: data.email,
    //     img_user: 'https://www.littlemiracles.com.au/wp-content/uploads/2015/08/kid-on-ipad.png'
    // };
    let itemUser = {
        user: data.user,
        password: data.pass,
        name: data.name,
        email: data.email,
        repassword: '123'
    };
    // users.push(itemUser)
    res.send(itemUser)
    // res.send("usuario creado correctamente")
})

//***************************************************************

//Crear y lanzar el servidor
http.createServer(app).listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
})
