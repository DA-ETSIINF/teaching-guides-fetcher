itinerarios09TT_4 = [
    {text: "SISTEMAS", link: '4/41'},
    {text: "TELEMÁTICA", link: '4/42'},
    {text: "ELECTRÓNICA", link: '4/43'},
    {text: "AUDIOVISUALES", link: '4/44'}
]
itinerarios09BM_4 = [
    {text: "Bioinstrumentación, Biomateriales y Biomecánica", link: '4/41'},
    {text: "Ingeniería de Datos y Salud Digital", link: '4/42'},
    {text: "imágenes Biomédicas", link: '4/43'},
]
itinerarios09AQ_2 = [
    {text: "ÁREA DE ESPECIALIDAD DE SEÑALES Y COMUNICACIONES II", link: '4/21'},
    {text: "ITINERARIO MACHINE LEARNING AND MULTIMEDIA DATA SCIENCE", link: '4/22'},
    {text: "ÁREA DE ESPECIALIDAD DE TELEMÁTICA II", link: '4/23'},
    {text: "AUDIOVISÁREA DE ESPECIALIDAD DE ELECTRÓNICA IIUALES", link: '4/24'},
    {text: "ÁREA DE ESPECIALIDAD DE BIOINGENIERÍA", link: '4/25'},
    {text: "ÁREA DE ESPECIALIDAD DE GESTIÓN, INNOVACIÓN Y NEGOCIO TIC", link: '4/26'}
]

exports.get_09TT = async (req, res, next) => {
    res.render('special_years', {title: "Itinerarios de cuarto", selection: itinerarios09TT_4});
}
exports.get_09BM = async (req, res, next) => {
    res.render('special_years', {title: "Itinerarios de cuarto", selection: itinerarios09BM_4});
}
exports.get_09AQ = async (req, res, next) => {
    res.render('special_years', {title: "Itinerarios de segundo", selection: itinerarios09AQ_2});
}