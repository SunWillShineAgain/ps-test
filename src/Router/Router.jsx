import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from '../components/User'
import TableWrap from '../components/TableWrap'
import UserEdit from '../components/UserEdit'

const Router = () => {
	return (
		<Routes>
			<Route path='/' exact element={<TableWrap />} />
			<Route
				path='/user'
				element={<>После user/ введите его id в адресной строке</>}
			/>
			<Route path='/user/:id' element={<User />} />
			<Route path='/user/:id/edit' element={<UserEdit />} />
			<Route path='/*' element={<>404 страница</>} />
		</Routes>
	)
}

export default Router
