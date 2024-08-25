import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import '../styles/TableComponent.scss'
import NewUser from './NewUser'
import { addUserToAPI } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Filters from './Filters'
import Table from './Table'

const TableComponent = ({ users }) => {
	const [currentUsers, setCurrentUsers] = useState([])

	const dispatch = useDispatch()

	const { register, handleSubmit } = useForm()

	const submitHandler = data => {
		dispatch(addUserToAPI(data))
		setIsModalOpen(false)
	}

	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	useEffect(() => {
		setCurrentUsers(users)
	}, [users])

	return (
		<>
			<div className='top'>
				<Filters setCurrentUsers={setCurrentUsers} users={users} />
				<Button type='primary' onClick={showModal}>
					Add User
				</Button>
				<Modal
					title='Add User'
					open={isModalOpen}
					onCancel={() => setIsModalOpen(false)}
					footer={null}
					width={320}
				>
					<NewUser
						register={register}
						handleSubmit={handleSubmit}
						submitHandler={submitHandler}
						setIsModalOpen={setIsModalOpen}
					/>
				</Modal>
			</div>
			<div className='table__wrap'>
				<Table currentUsers={currentUsers} setCurrentUsers={setCurrentUsers} />
			</div>
		</>
	)
}

export default TableComponent
