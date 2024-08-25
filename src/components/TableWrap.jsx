import { useEffect } from 'react'
import { fetchUsersFromAPI } from '../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import TableComponent from './TableComponent'

const TableWrap = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users)

	useEffect(() => {
		dispatch(fetchUsersFromAPI())
	}, [dispatch])

	return (
		<>
			{users.error ? (
				<p>{users.error}</p>
			) : users.status === 'loading' ? (
				<p>{users.status}</p>
			) : (
				<TableComponent users={users.users} />
			)}
		</>
	)
}

export default TableWrap
