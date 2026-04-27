import axios from 'axios'

type ApiError = {
	success: boolean
	message: string
}

export const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError<ApiError>(error)) {
		return error.response?.data?.message || 'Something went wrong'
	}

	if (error instanceof Error) {
		return error.message
	}

	return 'Something went wrong'
}
