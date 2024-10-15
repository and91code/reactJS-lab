import Link from 'next/link';

import { getUsers } from '@/actions/get-users';
import { IUser } from '@/@core/domain/User'
import PageTitle from '@/@core/presentation/layout/PageTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/@core/presentation/ui/table";

export default async function PageList() {
  const users: IUser[] = await getUsers()

  return (
    <>
      <PageTitle>Page APP</PageTitle>

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
                <Link
                  href={`/route-app/${user.id}`}
                  className='m-auto border p-1 rounded text-xs'
                >
                  editar
                </Link>
              </TableCell>
            </TableRow >
          ))}
        </TableBody>
      </Table>
    </>
  )
}
