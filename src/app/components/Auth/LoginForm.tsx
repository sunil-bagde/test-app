import { SpinLoader } from "@/app/components/Loding/Spinner";

export function LoginForm({ formData, onLogin }) {
	let { validationError, isSubmiting, loginError } = formData;
	return (
		<form
			noValidate
			className='space-y-6 px-1'
			onSubmit={onLogin}
			data-testid='login-form'
		>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium leading-6 text-primary-3'
				>
					Email
				</label>
				<div className='mt-2'>
					<input
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						required
						placeholder='Enter email'
						className='block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-primary-3 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-sm focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
					/>
				</div>
				<p className='mt-1 text-sm text-red-600 dark:text-red-500'>
					<span className='font-medium'> </span> {validationError.email}
				</p>
			</div>

			<div>
				<div className='flex items-center justify-between'>
					<label
						htmlFor='password'
						className='block text-sm font-medium leading-6 text-primary-3'
					>
						Password
					</label>
					<div className='hidden text-sm'>
						<a
							href='#'
							className='font-semibold text-indigo-400 hover:text-indigo-300'
						>
							Forgot password?
						</a>
					</div>
				</div>
				<div className='mt-2'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						placeholder='Enter password'
						className='block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-primary-3 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
					/>
				</div>
				<p className='mt-1 text-sm text-red-600 dark:text-red-500'>
					<span className='font-medium'> </span> {validationError.password}
				</p>
			</div>

			<div className=' pb-4 pt-2'>
				<button
					name='login'
					type='submit'
					disabled={isSubmiting}
					className={` ${
						isSubmiting ? "opacity-40" : ""
					}flex w-full justify-center rounded-md bg-primary-4  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-4`}
				>
					<span className='flex items-center justify-center'>
						{isSubmiting ? <SpinLoader /> : <></>}
						Login
					</span>
				</button>
			</div>
		</form>
	);
}
