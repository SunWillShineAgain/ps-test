import React, { useRef } from 'react'

const Filters = ({ setCurrentUsers, users }) => {
	const selectRef = useRef()
	const checkboxRef = useRef()

	const changeHandler = (value, isArchive) => {
		if (value === 'all') {
			isArchive
				? setCurrentUsers(users.filter(user => user.isArchive === isArchive))
				: setCurrentUsers(users)
			return
		}

		const filteredUsers = users
			.filter(user => user.role === value)
			.filter(user => user.isArchive === isArchive)

		setCurrentUsers(filteredUsers)
	}

	return (
		<div className='filters'>
			<select
				ref={selectRef}
				onChange={() =>
					changeHandler(selectRef.current.value, checkboxRef.current.checked)
				}
			>
				<option value='all'>All</option>
				<option value='driver'>Driver</option>
				<option value='waiter'>Waiter</option>
				<option value='cook'>Cook</option>
			</select>
			&nbsp;
			<label htmlFor='isArchive'>
				Показать архивные{' '}
				<input
					id='isArchive'
					type='checkbox'
					ref={checkboxRef}
					onChange={() =>
						changeHandler(selectRef.current.value, checkboxRef.current.checked)
					}
				/>
			</label>
		</div>
	)
}

export default Filters
