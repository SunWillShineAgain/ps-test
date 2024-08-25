import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { USERS_URL } from '../utils/consts'
import { Button } from 'antd'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useDispatch } from 'react-redux'
import { changeUserInAPI } from '../redux/slices/userSlice'

const UserEdit = () => {
	const { id } = useParams()
	const [user, setUser] = useState({})
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()
	const dispatch = useDispatch()

	useEffect(() => {
		axios
			.get(`${USERS_URL}${id}`)
			.then(response => {
				if (response.status === 200) setUser(response.data)
			})
			.catch(err => {
				setError(err.message)
			})
	}, [])

	const submitHandler = data => {
		const edittedUser = {
			id: user.id,
			name: data.name || user.name,
			isArchive: data.isArchive ?? user.isArchive,
			role: data.role || user.role,
			phone: data.phone || user.phone,
			birthday: data.birthday || user.birthday,
		}

		dispatch(changeUserInAPI(edittedUser))
		navigate(`/user/${id}`)
	}

	return (
		<>
			{error ? (
				<p>{error}</p>
			) : (
				<>
					<div className='user__buttons'>
						<Button type='primary' onClick={() => navigate(-1)} title='Назад'>
							⇐ Назад
						</Button>
					</div>
					<h3>Изменить пользователя {user?.name}</h3>
					<p>Введите новые данные:</p>
					<form onSubmit={handleSubmit(submitHandler)}>
						<div className='form__row'>
							<label>
								Имя:
								<input type='text' {...register('name')} />
							</label>
						</div>
						<div className='form__row'>
							<label>
								Телефон:
								<InputMask
									mask='+7 (999) 999-9999'
									permanents={[0, 1]}
									{...register('phone')}
								></InputMask>
							</label>
						</div>
						<div className='form__row'>
							Должность:
							<select {...register('role')}>
								<option value=''>Выберите должность</option>
								<option value='driver'>Водитель</option>
								<option value='waiter'>Официант</option>
								<option value='cook'>Повар</option>
							</select>
						</div>
						<div className='form__row'>
							<label>
								Дата рождения:
								<input type='date' {...register('birthday')} />
							</label>
						</div>
						<div className='form__row'>
							<label>
								Архивная вакансия?
								<input type='checkbox' {...register('isArchive')} />
							</label>
						</div>
						<button className='btn'>Сохранить</button>
					</form>
				</>
			)}
		</>
	)
}

export default UserEdit
