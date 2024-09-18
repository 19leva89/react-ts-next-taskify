'use client'

import { useFormState } from 'react-dom'
import { createBoard } from '@/actions/create-board'
import { FormInput } from './form-input'
import { FormButtonSubmit } from './form-button-submit'

export const Form = () => {
	const initialState = { message: null, errors: {} }
	const [state, dispatch] = useFormState(createBoard, initialState)

	return (
		<form action={dispatch}>
			<div className="flex flex-col space-y-2">
				<FormInput errors={state?.errors} />
			</div>

			<FormButtonSubmit />
		</form>
	)
}
