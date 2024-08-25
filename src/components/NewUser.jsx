import React from 'react'
import { Button } from 'antd'
import InputMask from 'react-input-mask'

const NewUser = ({ register, handleSubmit, submitHandler, setIsModalOpen }) => {
	return (
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
			<div className='modal__footer'>
				<Button type='primary' onClick={handleSubmit(submitHandler)}>
					Add user
				</Button>
				<Button type='primary' onClick={() => setIsModalOpen(false)}>
					Cancel
				</Button>
			</div>
		</form>
	)
}

export default NewUser
