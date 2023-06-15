exports.get_subjects = async (req, res, next) => {
    url = 'https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/plan.json/' + req.params.code + '/asignaturas?anio=202223'
    selection = []

    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        for (subject in data) {
            semester = data[subject].imparticion['1S']?.codigo_duracion || data[subject].imparticion['2S']?.codigo_duracion
            if (semester != '1S' && semester != '2S') continue;
            selection.push({
                "text": data[subject].nombre,
                "link": 'https://www.upm.es/gauss/includes_ajax/guias/gestion/gga_gestionar_descarga_pdf.upm?archivo=GA_' + req.params.code + '_' + data[subject].codigo + '_' + semester + '_2023-24'
            })
        }
    }

    res.render('subjects', { title: "Selecciona una asignatura", selection });
}