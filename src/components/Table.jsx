import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Table = ({ currentUsers, setCurrentUsers }) => {
	const [nameSort, setNameSort] = useState('asc')
	const [birthdaySort, setBirthdaySort] = useState('asc')

	const sortTableByName = (sortName, order) => {
		const sortedUsers = [...currentUsers].sort((a, b) => {
			if (order === 'asc') {
				setNameSort('desc')
				return a[sortName] < b[sortName] ? 1 : -1
			} else {
				setNameSort('asc')
				return a[sortName] > b[sortName] ? 1 : -1
			}
		})
		setCurrentUsers(sortedUsers)
	}

	const sortTableByBirthday = (sortName, order) => {
		const sortedUsers = [...currentUsers].sort((a, b) => {
			if (order === 'asc') {
				setBirthdaySort('desc')
				return (
					new Date(a[sortName].split('.').reverse().join('-')).getTime() -
					new Date(b[sortName].split('.').reverse().join('-')).getTime()
				)
			} else {
				setBirthdaySort('asc')
				return (
					new Date(b[sortName].split('.').reverse().join('-')).getTime() -
					new Date(a[sortName].split('.').reverse().join('-')).getTime()
				)
			}
		})
		setCurrentUsers(sortedUsers)
	}

	return (
		<table className='table'>
			<thead>
				<tr>
					<th
						onClick={() => sortTableByName('name', nameSort)}
						title='Сортировать по имени'
						className={nameSort === 'asc' ? 'down' : 'up'}
					>
						Name
					</th>
					<th>Role</th>
					<th>Phone</th>
					<th
						onClick={() => sortTableByBirthday('birthday', birthdaySort)}
						title='Сортировать по дате рождения'
						className={birthdaySort === 'asc' ? 'down' : 'up'}
					>
						Birthday
					</th>
				</tr>
			</thead>
			<tbody>
				{currentUsers.map(user => {
					return (
						<tr key={user.id}>
							<td title='Изменить пользователя'>
								<Link to={`/user/${user.id}`}>
									{user.name} {user.isArchive ? '(архив)' : ''}
								</Link>
							</td>
							<td>{user.role}</td>
							<td>{user.phone}</td>
							<td>{user.birthday}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default Table
