import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerSeriePorId } from './core/_peticiones'
import { Serie } from './core/_modelos'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { TarjetaActor } from './components/TarjetaActor'


const DetalleSeriePage = () => {

    const { id } = useParams()
    const [serie, setSerie] = useState<Serie | null>(null)
    // console.log("id de la URL", id)
    // console.log('Serie en el estado', serie);

    useEffect(() => {
        obtenerSeriePorId(Number(id))
            .then((res) => {
                // console.log('Serie de la API', res.data)
                setSerie(res.data)
                console.log('Actores:', res)
            })
    }, [id])

    // mientras serie sea null, todavia esta cargando
    if (!serie) {
        return (
            <div>
                <span>Cargando serie...</span>
            </div>
        )
    }

    const poster = serie.image?.original ?? toAbsoluteUrl('media/svg/files/blank-image.svg')

    const reparto = serie._embedded.cast ?? []
    const repartoPrincipal = reparto.slice(0, 12)
    // console.log("Reparto prnciapal", repartoPrincipal.length, 'de', reparto.length);


    return (
        <div>
            <Link to='/cartelera' className='btn btn-light mb-4'>
                <i className='bi bi-arrow-left'></i> Volver a la cartelera
            </Link>

            <h1>Detalle de la Serie{id}</h1>

            <div className='card'>
                <div className='card-body p-8'>
                    <div className='row g-8'>
                        <div className='col-md-4'>
                            <img src={poster} alt={serie.name} className='w-100 rounded' />
                        </div>
                        <div className='col-md-8'>
                            <h1 className='fw-bold text-gray-900 mb-4'>{serie.name}</h1>
                            <div className='d-flex flex-wrap gap-2 mb-6'>
                                {serie.genres.map((genero) => (
                                    <span key={genero} className='badge badge-light-primary fs-7'>
                                        {genero}
                                    </span>
                                ))}
                            </div>
                            <p className='text-gray-700 fs-6'>{serie.summary ?? 'Sin descripción.'}</p>
                        </div>
                    </div>
                </div>
            </div>


            <h3>Actores</h3>
            {repartoPrincipal.length > 0 ? (
                <div className='row g-6'>
                    {repartoPrincipal.map((actor) => (
                        <div key={`${actor.person.id}-${actor.character.id}`}
                            className='col-6 col-md-3 col-lg-2'
                        >
                            <TarjetaActor actor={actor} />
                        </div>

                    ))}
                </div>

            ) : (
                <div>sin informacion del actor</div>
            )}


        </div>
    )
}

export { DetalleSeriePage }
