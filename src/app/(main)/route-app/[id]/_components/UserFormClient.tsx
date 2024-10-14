'use client'

import React, { useState } from 'react'
import { IUser } from '@/@core/domain/User'
import { Button } from '@/@core/presentation/ui/button'
import { Input } from '@/@core/presentation/ui/input'
import { Label } from '@/@core/presentation/ui/label'
import { updateUser } from '../actions'

export const UserFormClient = (props: {
  user: Partial<IUser>
  updateUser: (p: FormData) => void
}) => {
  const [showMessage, setShowMessage] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = new FormData()

    payload.append('id', e.target?.['id'].value)
    payload.append('name', e.target?.['name'].value)
    payload.append('username', e.target?.['username'].value)
    payload.append('email', e.target?.['email'].value)

    await updateUser(payload)
  }

  return (
    <form className='shadow border p-3 mb-5' onSubmit={onSubmit}>
      <h2 className='text-2xl mb-2'>Form client</h2>

      {showMessage && (
        <div className="flex p-3 bg-yellow-200 text-yellow-700 mb-3">
          mensagem dinâmica!!
        </div>
      )}

      <Input className='hidden' name="id" defaultValue={props.user?.id} />
      <Input className='hidden' name="username" defaultValue={props.user?.username} />
      <Input className='hidden' name="email" defaultValue={props.user?.email} />

      <div className='flex flex-col mb-3'>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={props.user?.name}
          onChange={({ target }) => {
            setShowMessage(target.value === 'joao')
          }}
        />
      </div>

      <div className="p-2">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  )
}
