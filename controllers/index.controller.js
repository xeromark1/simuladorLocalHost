const { Pool } = require('pg');

const pool = new Pool({
    user: 'alumno',
    host: '157.245.180.1',
    password: 'alumno',
    database: 'simulador2023',
    port: 5432
});

const getCarreras = async (req, res) => {
    const response = await pool.query('SELECT * FROM carrera');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const getRamos = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query(' Select id, nombre_asignatura \
                                        from ramo  \
                                        where id IN (select id_ramos \
                                                    from ramos_compartidos \
                                                    where id_carrera IN ( select id from carrera  \
                                                    where id =$1))', [id]); 
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const getSecciones = async (req, res) => {
    const id_carrera = parseInt(req.params.carrera);
    const id_ramo = req.params.ramo;
console.log(id_ramo);
    const response = await pool.query('SELECT ramo.id, ramo.nombre_asignatura, seccion.codigo, profesor.nombre, descripcion_del_evento.descripcion, dias.dia, hora.hora \
                                        FROM ramo \
                                        JOIN seccion \
                                        ON ramo.id = seccion.id_ramo \
                                        JOIN evento \
                                        ON seccion.codigo = evento.id_seccion \
                                        JOIN profesor \
                                        ON evento.id_profesor = profesor.id \
                                        JOIN horario \
                                        ON evento.id_horario = horario.id \
                                        JOIN dias \
                                        ON horario.id_dia = dias.id \
                                        JOIN hora \
                                        ON horario.id_hora = hora.id \
                                        JOIN descripcion_del_evento \
                                        ON evento.id_descripcion_del_evento = descripcion_del_evento.id \
                                        WHERE ramo.id IN (  select id_ramos \
                                                            from ramos_compartidos \
                                                            where id_carrera = $1) \
                                        AND ramo.id = $2', [id_carrera , id_ramo]);
        console.log(response.rows);
        res.status(200).json(response.rows);
};

const getTodasSecciones = async (req, res) => {
    const id_carrera = parseInt(req.params.carrera);
    const response = await pool.query('SELECT ramo.id, seccion.codigo, dias.dia, hora.hora, ramo.nombre_asignatura, profesor.nombre, descripcion_del_evento.descripcion \
                                        FROM ramo \
                                        JOIN seccion \
                                        ON ramo.id = seccion.id_ramo \
                                        JOIN evento \
                                        ON seccion.codigo = evento.id_seccion \
                                        JOIN profesor \
                                        ON evento.id_profesor = profesor.id \
                                        JOIN horario \
                                        ON evento.id_horario = horario.id \
                                        JOIN dias \
                                        ON horario.id_dia = dias.id \
                                        JOIN hora \
                                        ON horario.id_hora = hora.id \
                                        JOIN descripcion_del_evento \
                                        ON evento.id_descripcion_del_evento = descripcion_del_evento.id \
                                        WHERE ramo.id IN (  select id_ramos \
                                                            from ramos_compartidos \
                                                            where id_carrera = $1)', [id_carrera]);
        console.log(response.rows);
        res.status(200).json(response.rows);
};


module.exports = {
    getCarreras,
    getRamos,
    getSecciones,
    getTodasSecciones
};