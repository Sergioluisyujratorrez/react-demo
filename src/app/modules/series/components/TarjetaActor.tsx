import React from 'react'
import { Actor } from '../core/_modelos' 
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

type Props = {
    actor: Actor
}

const TarjetaActor = ({actor}: Props) => {

    const fotos = actor.person.image?.medium ?? toAbsoluteUrl('media/avatars/blank.png')
  return (
    <div className='card h-100 shadow-sm'>
      <img
        src={fotos}
        alt={actor.person.name}
        className='card-img-top object-fit-cover'
        style={{height: 220}}
      />
      <div className='card-body p-4'>
        <div className='fw-bold text-gray-900'>{actor.person.name}</div>
        <div className='text-muted fs-7'>como {actor.character.name}</div>
      </div>
    </div>
  )
}

export  {TarjetaActor}
