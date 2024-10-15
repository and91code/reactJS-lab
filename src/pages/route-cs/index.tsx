import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { IUser } from '@/@core/domain/User'
import { apiUsers } from '@/@core/infra/api/user'
import PageTitle from '@/@core/presentation/layout/PageTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/@core/presentation/ui/table'

export default function PageList() {
  const route = useRouter()
  const [users, setUsers] = useState<IUser[]>([])

  const fetchData = async () => {
    try {
      const data = await apiUsers().get()
      setUsers(data.data)
    } catch (error) {
      console.log('... error', (error as Error).message);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PageTitle>Page CS</PageTitle>

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
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell className='text-center'>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className='flex justify-center'>
                <button
                  className='m-auto border p-1 rounded text-xs'
                  onClick={() => route.push(`/route-cs/${user.id}`)}
                >
                  editar
                </button>
              </TableCell>
            </TableRow >
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
