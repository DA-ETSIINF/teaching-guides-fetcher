const schoolData = require('../schoolData.json');
const anio = schoolData.academic_year.replace('-','')
const school = schoolData.school

exports.index = async (req, res, next) => {
    res.render('index', { degrees: schoolData.degrees, departments: schoolData.departments });
}

exports.get_subjects_by_degree = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.code + '/asignaturas?anio=' + anio + '&campos=codigo%2Cimparticion'
    selection = []

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (subject in data) {
            semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
            if (semester != '1S' && semester != '2S') continue;
            selection.push({
                "text": data[subject].nombre,
                "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + req.params.code + '_' + data[subject].codigo + '_' + semester + '_' + schoolData.academic_year
            })
        }
    }
    res.render('subjects', { title: "Selecciona una asignatura", selection });
}
exports.get_years_by_degree = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.tit + '?campos=curso_maximo'
    selection = []

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (let i = 1; i <= data.curso_maximo; i++){
            selection.push({
                "text": i + 'º',
                "link": (req.params.tit + '/' + i)
            })
        }
    }
    res.render('years', { title: "Selecciona un curso", selection });
}
exports.get_subjects_by_degree_and_course = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.tit + '/asignaturas?anio=' + anio
    selection = []
    optativas = false;

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (subject in data) {
            if (data[subject].curso != req.params.year) continue;
            semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
            if (semester != '1S' && semester != '2S') continue;
            if (data[subject].codigo_tipo_asignatura == 'O' && data[subject].curso != 4) {
                optativas = true;
                continue;
            }
            if (data[subject].curso == 4 && (data[subject].nombre.startsWith("PROGRAMAS DE INTERCAMBIO") || data[subject].nombre.startsWith("MOVILIDAD") || data[subject].nombre.startsWith("PRÁCTICAS"))) continue;
            selection.push({
                "text": data[subject].nombre,
                "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + req.params.tit + '_' + data[subject].codigo + '_' + semester + '_' + schoolData.academic_year
            })
        }
        if(optativas){
            selection.push({
                "text": 'OPTATIVAS',
                "link": (req.params.year + '/optativas'),
                "target": "_blank"
            })
        }
    }
    res.render('subjects', { title: "Selecciona una asignatura", selection });
}


exports.get_subjects_by_department = async (req, res, next) => {
    url_plans = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/departamento.json/' + req.params.code + '/planes?anio=' + anio
    selection = []
    
    const response_plans = await fetch(url_plans);
    if (response_plans.status === 200) {
        const plans = await response_plans.json();
        for (plan in plans) {
            if (!plans[plan].codigo.startsWith(school)) continue;
            url_subjects = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/departamento.json/' + req.params.code + '/' + plans[plan].codigo + '/asignaturas?anio=' + anio
            const response_subjects = await fetch(url_subjects);
            console.log(response_subjects)
            if (response_subjects.status === 200) {
                const data = await response_subjects.json();
                for (subject in data){
                    semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
                    if (semester != '1S' && semester != '2S') continue;
                    selection.push({
                        "text": plans[plan].codigo + ': ' + data[subject].nombre,
                        "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + plans[plan].codigo + '_' + data[subject].codigo + '_' + semester + '_' + schoolData.academic_year,
                        "target": "_blank"
                    })
                }
            }
        }
    }
    res.render('subjects', { title: "Selecciona una asignatura", selection });
}

exports.get_optativas = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.tit + '/asignaturas?anio=' + anio
    selection = []

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (subject in data) {
            if (data[subject].curso != req.params.year) continue;
            semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
            if (semester != '1S' && semester != '2S') continue;
            if (data[subject].codigo_tipo_asignatura != 'O') continue;
            selection.push({
                "text": data[subject].nombre,
                "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + req.params.tit + '_' + data[subject].codigo + '_' + semester + '_' + schoolData.academic_year
            })
        }
    }
    res.render('subjects', { title: "Selecciona una asignatura", selection });
}
exports.get_subjects_by_group = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.tit + '/asignaturas?anio=' + data.academic_year.replace('-','')
    selection = []

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (subject in data) {
            if (data[subject].curso != req.params.year) continue;
            semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
            if (semester != '1S' && semester != '2S') continue;
            if (!(data[subject].imparticion['1S'].grupos_matricula['TST 41.1'].nombre_grupo.includes(req.params.group))) continue;
            selection.push({
                "text": data[subject].nombre,
                "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + req.params.tit + '_' + data[subject].codigo + '_' + semester + '_' + data.academic_year
            })
        }
    }
    res.render('subjects', { title: "Selecciona una asignatura", selection });
}
