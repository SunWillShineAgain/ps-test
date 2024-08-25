import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { USERS_URL } from '../../utils/consts'
import axios from 'axios'

const initialState = {
	users: [],
	status: null,
	error: null,
}

export const fetchUsersFromAPI = createAsyncThunk(
	'users/fetchUsersFromAPI',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(USERS_URL)
			const users = await response.data
			return { users }
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const addUserToAPI = createAsyncThunk(
	'users/addUserToAPI',
	async ({ name, isArchive, role, phone, birthday }, { rejectWithValue }) => {
		try {
			const response = await axios({
				method: 'POST',
				url: USERS_URL,
				data: {
					id: nanoid(),
					name: name || 'Default Name',
					isArchive,
					role,
					phone: phone || '+7 (800) 555-3535',
					birthday: birthday.split('-').reverse().join('.') || '01.01.1900',
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			const data = response.data

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const changeUserInAPI = createAsyncThunk(
	'users/changeUserInAPI',
	async (
		{ id, name, isArchive, role, phone, birthday },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios({
				method: 'PATCH',
				url: `${USERS_URL}${id}`,
				data: {
					id,
					name,
					isArchive,
					role,
					phone,
					birthday: birthday.split('-').reverse().join('.'),
				},
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
			})
			const data = response.data

			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const userSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: builder => {
		builder
			.addCase(fetchUsersFromAPI.pending, state => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchUsersFromAPI.fulfilled, (state, { payload }) => {
				state.status = 'Data loaded'
				state.users = payload.users
			})
			.addCase(fetchUsersFromAPI.rejected, state => {
				state.status = 'Data is not loaded...'
				state.error = 'Users loading failed...'
			})
			.addCase(addUserToAPI.fulfilled, (state, { payload }) => {
				state.status = 'User added'
				state.error = null
				state.users.push(payload)
			})
			.addCase(changeUserInAPI.fulfilled, (state, { payload }) => {
				const user = state.users.findIndex(u => u.id === payload.id)
				state.users[user] = payload
			})
	},
})

export default userSlice.reducer
