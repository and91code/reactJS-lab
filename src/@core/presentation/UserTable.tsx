import React, { FC } from 'react'
import { IUser } from '../domain/User'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'


interface UserTableProps {
  data: IUser[]
  onClickEdit: (id: number) => void
}

const UserTable: FC<UserTableProps> = ({ data, onClickEdit }) => {
  return (
    <Table className='border rounded'>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10 text-center">ID</TableHead>
          <TableHead className="">Nome</TableHead>
          <TableHead className="">Email</TableHead>
          <TableHead className='text-center'>-</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(user => (
          <TableRow key={user.id}>
            <TableCell className='text-center'>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className='flex justify-center'>
              <button
                className='m-auto border p-1 rounded text-xs'
                onClick={() => onClickEdit(user.id)}
              >
                editar
              </button>
            </TableCell>
          </TableRow >
        ))}
      </TableBody>
    </Table>
  )
}

export default UserTable
