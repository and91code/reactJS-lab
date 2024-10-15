import React from 'react'
import { IUser } from '@/@core/domain/User'
import { Button } from '@/@core/presentation/ui/button'
import { Input } from '@/@core/presentation/ui/input'
import { Label } from '@/@core/presentation/ui/label'

export const UserFormServer = (props: {
  user: Partial<IUser>
  updateUser: (p: FormData) => void
}) => {

  return (
    <>
      <h2 className='text-2xl mb-2'>Form server</h2>
      <form className='shadow border p-3' action={props.updateUser}>
        <Input className='hidden' name="id" defaultValue={props.user?.id} />
        <Input className='hidden' name="username" defaultValue={props.user?.username} />
        <Input className='hidden' name="email" defaultValue={props.user?.email} />

        <div className='flex flex-col mb-3'>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={props.user?.name} />
        </div>

        <div className="p-2">
          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </>
  )
}
