import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { USERS_URL } from '../utils/consts'
import axios from 'axios'
import { Button } from 'antd'

const User = () => {
	const { id } = useParams()
	const [user, setUser] = useState({})
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`${USERS_URL}${id}`)
			.then(response => {
				if (response.status === 200) setUser(response.data)
			})
			.catch(err => {
				setError(err.message)
			})
	}, [user])

	return (
		<>
			{error ? (
				<p>
					{error}. Пользователя с таким ID не существует.{' '}
					<Link to='/'>Вернуться на главную</Link>
				</p>
			) : (
				<div className='user'>
					<div className='user__buttons'>
						<Button type='primary' onClick={() => navigate('/')} title='Назад'>
							⇐ Назад
						</Button>
						<Button
							type='primary'
							danger
							onClick={() => navigate(`edit`)}
							title='Изменить'
						>
							Изменить
						</Button>
					</div>
					<h3>Информация о пользователе {user?.name}</h3>
					<div className='user__table'>
						<div className='user__table-row'>
							{Object.keys(user).map(u => (
								<p className='user__table-cell' key={u}>
									{u}
								</p>
							))}
						</div>
						<div className='user__table-row'>
							{Object.values(user).map(u => (
								<p className='user__table-cell' key={u}>
									{typeof u === 'boolean'
										? u
											? 'в архиве'
											: 'не в архиве'
										: u}
								</p>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default User
